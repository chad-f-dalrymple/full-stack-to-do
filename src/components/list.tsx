import { useEffect, useState} from 'react';
import { List, Flex, Container, Button } from '@chakra-ui/react';
import { Checkbox } from './ui/checkbox';
import { deleteTodo } from '../utils/utils';
import { Icon } from '@chakra-ui/react';
import { MdDelete } from "react-icons/md";

interface Props {
    listItems: any[];
    setListItems: any;
    refreshList: any;
    checkUpdates: any;
}

const ListComponent = (props: Props) => {
    const { listItems, checkUpdates } = props
    const [checked, setChecked] = useState(false)
    const deleteItem = async (item: string) => {
        const updatedlist = await deleteTodo(item)
    }
    const list = listItems.map((item, idx) =>
        <Flex direction='row' gap="4" align="center">
            <Flex direction="row" gap="4" align="center">
                <Checkbox
                    color="orange"
                    variant='outline'
                    key={`${item.completed}${idx}`}
                    checked={checked}
                    onCheckedChange={e => setChecked(!!e.checked)}
                    defaultChecked={item.completed}
                />
                <div className="text-blue-600" key={item.title}>{item.title}</div>
            </Flex>
            <Button
                variant="ghost"
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