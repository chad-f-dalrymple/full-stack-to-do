import React, { useState, useRef } from "react";
import { Button, createListCollection, Fieldset, Input, Stack, Flex } from '@chakra-ui/react';
import { Field } from "./ui/field";
import { addTodo } from "../utils/utils";
import { Toaster, toaster } from "../components/ui/toaster"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

const ListFieldSet = (props: any) => {
  const { checkUpdates, listName, setAddState } = props
  const priorityValues = createListCollection({
    items: [
      { label: "High", value: "High" },
      { label: "Medium", value: "Medium" },
      { label: "Low", value: "Low" }
    ]
  })
  const categoryValues = createListCollection({
    items: [
      { label: "Work", value: "Work" },
      { label: "Personal", value: "Personal" }
    ]
  })
  const [selectedPriority, setSelectedPriority] = useState<string[]>(["Medium"])
  const [itemInputValue, setItemInputValue] = useState('')
  const [nameInputValue, setNameInputValue] = useState(listName)
  const [selectedCategory, setSelectedCategory] = useState<string[]>(["Work"])
  // const currentDate = moment().format("YYYY-MM-DD HH:MM:SS")
  const priority = () => selectedPriority[0] !== '' ? selectedPriority[0] : ''
  const category = () => selectedCategory[0] !== '' ? selectedCategory[0] : ''
  const handleItemInputChange = (e: any) => setItemInputValue(e.target.value)
  const createToDo = async (title: string, priority: string, category: string) => await addTodo(title, priority, category)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Toaster />
      <DialogRoot placement="center" aria-label="add-item-to-list" size="md" motionPreset="slide-in-bottom">
        <DialogTrigger asChild>
          <Button
            style={{width: '350px', margin: 'auto'}}
            colorPalette="blue"
          >
            + Add New Task
          </Button>
        </DialogTrigger>
        <DialogContent style={{background: "white"}} ref={contentRef}>
          <DialogHeader>
            <DialogTitle className="text-black">Add an item to your list</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Fieldset.Root size="lg" maxW="md">
              <Fieldset.Content>
                <Field className="text-black" label="Item">
                  <Input
                    variant="flushed"
                    color="black"
                    value={itemInputValue}
                    onChange={handleItemInputChange}
                    name="item"
                  />
                </Field>
              </Fieldset.Content>
              <Flex direction="row">
                <SelectRoot
                  color="black"
                  size="sm"
                  collection={categoryValues}
                  value={selectedCategory}
                  defaultValue={["Work"]}
                  onValueChange={(e) => setSelectedCategory(e.value)}
                >
                  <SelectLabel textAlign="left">Select category</SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent portalRef={contentRef as React.RefObject<HTMLDivElement>}>
                    {categoryValues.items.map((category) => (
                      <SelectItem item={category} key={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
                <SelectRoot
                  color="black"
                  size="sm"
                  collection={priorityValues}
                  value={selectedPriority}
                  defaultValue={["Medium"]}
                  onValueChange={(e) => setSelectedPriority(e.value)}
                >
                  <SelectLabel textAlign="left">Select priority</SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent portalRef={contentRef as React.RefObject<HTMLDivElement>}>
                    {priorityValues.items.map((priority) => (
                      <SelectItem item={priority} key={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Flex>
            </Fieldset.Root>
          </DialogBody>
          <DialogFooter>
            <DialogCloseTrigger style={{background: 'none'}}>
              <Button
                style={{ background: 'none' }}
                variant="ghost"
                color="black"
                onClick={() => {
                  setAddState(false)
                }}
              >
                Cancel
              </Button>
            </DialogCloseTrigger>
            <DialogActionTrigger asChild>
            <Button
              disabled={itemInputValue === ''}
              colorPalette="green"
              onClick={() => {
                toaster.promise(createToDo(itemInputValue, priority(), category()), {
                  success: {
                    title: "Successfully added!",
                    description: "Looks great",
                    duration: 6000
                  },
                  error: {
                    title: "Upload failed",
                    description: "Something wrong with the upload",
                    duration: 6000
                  },
                  loading: { title: "Uploading...", description: "Please wait" },
                })
                checkUpdates(true)
                setItemInputValue('')
                setNameInputValue('')
                setSelectedPriority(["Medium"])
              }}
            >
              Create Item
            </Button>
            </DialogActionTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

    </>
  )
}

export default ListFieldSet;