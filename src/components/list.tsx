import { useEffect, useState} from 'react';
import { List, Flex, Container, Button } from '@chakra-ui/react';
import { Checkbox } from './ui/checkbox';
import { deleteTodo, updateTodo } from '../utils/utils';
import { Icon } from '@chakra-ui/react';
import { MdDelete } from "react-icons/md";
import moment from 'moment';

interface Props {
    listItems: any[];
    setListItems: any;
    refreshList: any;
    checkUpdates: any;
}

const ListComponent = (props: Props) => {
    const { listItems, checkUpdates } = props
    const [checked, setChecked] = useState(false)
    const currentDate = moment().format("YYYY-MM-DD HH:MM:SS")
    const deleteItem = async (item: number) => await deleteTodo(item)
    const updateItem = async (id: number, checked: boolean, date: any) => await updateTodo(id, checked, date)
    const className = (priority: string) => {
        if (priority === 'High') {
            return 'bg-red-600'
        }
        if (priority === 'Medium') {
            return 'bg-amber-600'
        }
        if (priority === 'Low') {
            return 'bg-green-600'
        }
    }
    const list = listItems.map((item, idx) =>
        <Flex direction='row' gap="4" align="center">
            <Flex direction="row" gap="4" align="center">
                <Checkbox
                    colorPalette="orange"
                    variant='outline'
                    key={`${item.completed}${idx}`}
                    checked={checked}
                    onCheckedChange={e => {
                        setChecked(!!e.checked)
                        updateItem(item.id, checked, currentDate)
                    }}
                    defaultChecked={item.completed}
                />
                <div className="text-blue-600" key={item.title}>{item.title}</div>
                <div className={`${className(item.priority)} rounded-sm`} style={{paddingInline: '8px'}} key={`${item.title}-${item.priority}`}>{item.priority}</div>
            </Flex>
            <Button
                variant="plain"
                onClick={(e) => {
                    deleteItem(item.id)
                    checkUpdates(true)
                }}
                marginEnd="auto"
            >
                <Icon fontSize="12px" color="gray">
                    <MdDelete />
                </Icon>
            </Button>
        </Flex>
    )
    return (
        <Container maxWidth="xl" px="2">
            {list}
        </Container>
    )
}

export default ListComponent;