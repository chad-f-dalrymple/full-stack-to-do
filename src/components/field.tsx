import { useEffect, useState } from "react";
import { Button, createListCollection, Fieldset, Input, Stack } from '@chakra-ui/react';
import { Field } from "./ui/field";
import { addTodo } from "../utils/utils";
import { 
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText
} from "@chakra-ui/react";

const ListFieldSet = (props: any) => {
    const { checkUpdates } = props
    const priorityValues = createListCollection({
        items: [
            { label: "High", value: "High"},
            { label: "Medium", value: "Medium"},
            { label: "Low", value: "Low"}
        ]
    })
    const [selectedPriority, setSelectedPriority] = useState<string[]>([])
    const [inputValue, setInputValue] = useState('')
    // const currentDate = moment().format("YYYY-MM-DD HH:MM:SS")
    const priority = () => selectedPriority[0] !== '' ? selectedPriority[0] : ''
    const handleInputChange = (e: any) => setInputValue(e.target.value)
    const createToDo = async (title: string, priority: string) => await addTodo(title, priority)
    const defaultValue = ["Medium"]

    return (
        <Fieldset.Root size="lg" maxW="md">
            <Stack>
            <Fieldset.Legend>To Do list</Fieldset.Legend>
            <Fieldset.HelperText>
                Add an item to your list.
            </Fieldset.HelperText>
            </Stack>
    
            <Fieldset.Content>
                <Field className="text-black" label="Title">
                    <Input
                        color="black"
                        value={inputValue}
                        onChange={handleInputChange}
                        name="title"
                    />
                </Field>
            </Fieldset.Content>
            <SelectRoot collection={priorityValues} value={selectedPriority} defaultValue={defaultValue} variant="subtle" onValueChange={(e) => setSelectedPriority(e.value)}>
            <SelectLabel>Select priority</SelectLabel>
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
                variant="plain"
                onClick={(e) => {
                    createToDo(inputValue, priority())
                    checkUpdates(true)
                    setInputValue('')
                    setSelectedPriority(defaultValue)
                }}
            >
                Create</Button>
        </Fieldset.Root>
    )
}

export default ListFieldSet;