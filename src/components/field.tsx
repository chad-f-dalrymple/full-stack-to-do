import { useState } from "react";
import { Button, createListCollection, Fieldset, Input, Stack } from '@chakra-ui/react';
import { Field } from "./ui/field";
import { addTodo } from "../utils/utils";
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
  } from "@/components/ui/select"

const ListFieldSet = (props: any) => {
    const { checkUpdates } = props
    const priorityValues = createListCollection({
        items: [
            { label: "High", value: "High"},
            { label: "Medium", value: "Medium"},
            { label: "Low", value: "Low"}
        ]
    })
    const [selectedPriority, setSelectedPriority] = useState<string[]>(["Medium"])
    const [inputValue, setInputValue] = useState('')
    // const currentDate = moment().format("YYYY-MM-DD HH:MM:SS")
    const priority = () => selectedPriority[0] !== '' ? selectedPriority[0] : ''
    const handleInputChange = (e: any) => setInputValue(e.target.value)
    const createToDo = async (title: string, priority: string) => await addTodo(title, priority)

    return (
        <Fieldset.Root size="lg" maxW="md">
            <Stack>
            <Fieldset.Legend className="text-left font-extrabold" color="black">To Do list</Fieldset.Legend>
            <Fieldset.HelperText className="text-left" color="black">
                Add an item to your list.
            </Fieldset.HelperText>
            </Stack>
    
            <Fieldset.Content>
                <Field className="text-black" label="Item">
                    <Input
                        color="black"
                        value={inputValue}
                        onChange={handleInputChange}
                        name="item"
                    />
                </Field>
            </Fieldset.Content>
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
            <Button
                disabled={inputValue === ''}
                colorPalette="green"
                onClick={(e) => {
                    createToDo(inputValue, priority())
                    checkUpdates(true)
                    setInputValue('')
                    setSelectedPriority(["Medium"])
                }}
            >
                Create
            </Button>
        </Fieldset.Root>
    )
}

export default ListFieldSet;