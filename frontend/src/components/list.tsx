import React, {useState} from 'react'
import { Flex, Container, Button } from '@chakra-ui/react';
import { Checkbox } from './ui/checkbox';
import { deleteTodo, updateTodo } from '../utils/utils';
import { Icon } from '@chakra-ui/react';
import { MdDelete } from "react-icons/md";
import { FaTag } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import moment from 'moment';

interface Props {
  listItems: any[];
  setListItems: any;
  refreshList: any;
  checkUpdates: any;
  addState?: boolean;
}

const ListComponent = (props: Props) => {
  let isChecked: string | boolean;
  const { listItems, checkUpdates, addState } = props
  const currentDate = moment().format("YYYY-MM-DD HH:MM:SS")
  const [isEditing, setIsEditing] = useState(false)
  const deleteItem = async (item: number) => await deleteTodo(item)
  const updateItem = async (id: number, checked: boolean) => await updateTodo(id, checked)
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
      <div className='bg-white rounded-lg'
        style={{
          paddingTop: 4,
          paddingRight: 8,
          paddingBottom: 4,
          paddingLeft: 8,
          marginBottom: '12px',
          border: '1px, solid, gray'
        }}
      >
        <Flex justify="space-between" align="center" gap="4">
          <Flex direction='column' gap="4" justify="flex-start">
            <Flex direction='row' gap="4" align="center" justify="flex-start">
              <Checkbox
                colorPalette={item.completed || isChecked ? "gray" : "orange"}
                variant='outline'
                key={`${item.completed}${idx}`}
                onCheckedChange={e => {
                  isChecked = e.checked
                  // @ts-ignore
                  updateItem(item.id, isChecked)
                  checkUpdates(true)
                }}
                disabled={(item.completed || isChecked) && !isEditing}
                defaultChecked={item.completed}
              />
              <div className={itemClassName(item.completed)} key={item.title}>{item.title}</div>
            </Flex>
            <Flex direction='row' gap="4" align="center" justify="flex-start">
              <div className='text-gray-500' style={{ fontSize: '12px' }} key={`${item.title}-${item.category}`}>
                <Icon style={{ marginRight: '4px' }} fontSize="12px" color="gray">
                  <FaTag />
                </Icon>
                {item.category}
              </div>
              <div
                className={`${className(item.priority, item.completed)} rounded-sm`}
                style={{ paddingInline: '4px', fontSize: '12px' }}
                key={`${item.title}-${item.priority}`}
              >
                {item.priority}
              </div>
            </Flex>
          </Flex>
          <Flex>
            <Button
              style={{ marginRight: 0, paddingRight: 0 }}
              variant="plain"
              onClick={() => {
                setIsEditing(!isEditing)
              }}
              marginEnd="auto"
            >
              <Icon fontSize="12px" color="gray">
                <FaPencilAlt />
              </Icon>
            </Button>
            <Button
              style={{ marginRight: 0, paddingRight: 0 }}
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
        </Flex>
      </div>
    </>
  )
  return (
    <Container style={{ marginTop: '14px' }} maxWidth="xl" px="2">
      {listItems.length === 0 && !addState &&
        <div className='text-black' style={{ marginBottom: '16px' }}>No tasks found. Time to create one!</div>
      }
      {list}
    </Container>
  )
}

export default ListComponent;