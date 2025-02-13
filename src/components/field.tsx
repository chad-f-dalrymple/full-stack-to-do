import { useEffect, useState } from "react";
import { Button, Fieldset, Input, Stack } from '@chakra-ui/react';
import { Field } from "./ui/field";
import { addTodo } from "../utils/utils";

const ListFieldSet = (props: any) => {
    const { refreshList, checkUpdates } = props
    const [inputValue, setInputValue] = useState('')
    const handleInputChange = (e: any) => setInputValue(e.target.value)
    const createToDo = async (title: string) => await addTodo(title)
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
            <Button
                variant="ghost"
                onClick={(e) => {
                    createToDo(inputValue)
                    checkUpdates(true)
                    setInputValue('')
                }}
            >
                Create</Button>
        </Fieldset.Root>
    )
}

export default ListFieldSet;