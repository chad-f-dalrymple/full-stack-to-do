import React, { useState } from "react";
import { Button, createListCollection, Fieldset, Input, Stack, Flex } from '@chakra-ui/react';
import { Field } from "./ui/field";
import { addTodo } from "../utils/utils";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
  } from "../components/ui/select"

const ListFieldSet = (props: any) => {
    const { checkUpdates, listName } = props
    const priorityValues = createListCollection({
        items: [
            { label: "High", value: "High"},
            { label: "Medium", value: "Medium"},
            { label: "Low", value: "Low"}
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
    const [showInputs, setShowInputs] = useState(false)
    // const currentDate = moment().format("YYYY-MM-DD HH:MM:SS")
    const priority = () => selectedPriority[0] !== '' ? selectedPriority[0] : ''
    const category = () => selectedCategory[0] !== '' ? selectedCategory[0] : ''
    const handleItemInputChange = (e: any) => setItemInputValue(e.target.value)
    const createToDo = async (title: string, priority: string, category: string) => await addTodo(title, priority, category)
    console.log(showInputs)
    return (
        <>
        {!showInputs && <Button style={{width: '350px', margin: 'auto'}} colorPalette="blue" onClick={() => setShowInputs(true)}>
            + Add New Task
        </Button>
        }
        {showInputs && <Fieldset.Root size="lg" maxW="md">
            <Stack>
            <Fieldset.Legend className="text-left font-extrabold" color="black">To Do list</Fieldset.Legend>
            <Fieldset.HelperText className="text-left" color="black">
                Add an item to your list.
            </Fieldset.HelperText>
            </Stack>
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
                <SelectContent>
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
                <SelectContent>
                    {priorityValues.items.map((priority) => (
                        <SelectItem item={priority} key={priority.value}>
                            {priority.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
            </Flex>
            <Flex direction="row" justify="center">
                <Button
                    style={{background: 'none'}}
                    variant="ghost"
                    color="black"
                    onClick={() => {
                        setShowInputs(false)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    disabled={itemInputValue === ''}
                    colorPalette="green"
                    onClick={() => {
                        createToDo(itemInputValue, priority(), category())
                        checkUpdates(true)
                        setItemInputValue('')
                        setNameInputValue('')
                        setSelectedPriority(["Medium"])
                        setShowInputs(false)
                    }}
                >
                    Create Item
                </Button>
            </Flex>
        </Fieldset.Root>
        }
        </>
    )
}

export default ListFieldSet;