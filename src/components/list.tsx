import { Flex, Container, Button } from '@chakra-ui/react';
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
    let isChecked: string | boolean;
    const { listItems, checkUpdates } = props
    const currentDate = moment().format("YYYY-MM-DD HH:MM:SS")
    const deleteItem = async (item: number) => await deleteTodo(item)
    const updateItem = async (id: number, checked: boolean, date: any) => await updateTodo(id, checked, date)
    const className = (priority: string, completed: string | boolean) => {
        if (priority === 'High') {
            return isChecked || completed ? 'bg-gray-200' : 'bg-red-600'
        }
        if (priority === 'Medium') {
            return isChecked || completed ? 'bg-gray-200' : 'bg-amber-600'
        }
        if (priority === 'Low') {
            return isChecked || completed ? 'bg-gray-200' : 'bg-green-600'
        }
    }
    const itemClassName = (completed: string | boolean) => completed || isChecked ? "text-gray-200" : "text-blue-600"
    const list = listItems.map((item, idx) =>
        <>
            <Flex justify="space-between" align="center" gap="4">
            <Flex direction='row' gap="4" align="center" justify="flex-start">
                <Checkbox
                    colorPalette={item.completed || isChecked ? "gray" : "orange"}
                    variant='outline'
                    key={`${item.completed}${idx}`}
                    onCheckedChange={e => {
                        isChecked = e.checked
                        // @ts-ignore
                        updateItem(item.id, isChecked, currentDate)
                    }}
                    disabled={item.completed || isChecked}
                    defaultChecked={item.completed}
                />
                <div className={itemClassName(item.completed)} key={item.title}>{item.title}</div>
                <div
                    className={`${className(item.priority, item.completed)} rounded-sm`}
                    style={{paddingInline: '8px'}}
                    key={`${item.title}-${item.priority}`}
                >
                    {item.priority}
                </div>
            </Flex>
            <Button
                variant="plain"
                onClick={() => {
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
        </>
    )
    return (
        <Container style={{marginTop: '14px'}} maxWidth="xl" px="2">
            {list}
        </Container>
    )
}

export default ListComponent;