import React, {useState} from 'react';
import {
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
  } from "../components/ui/select"
  import { createListCollection } from '@chakra-ui/react';

const ListNameInput = (props) => {
    const {listItems, setListName, listName, setHasUpdates} = props
    const names = listItems.map(i => {
        return {"label": i.name, "value" :i.name}
    }) 
    const foo = createListCollection({
        items: names
    })

    return (
        <>
       {names.length > 0 && <div>
            <SelectRoot
                color="black"
                size="sm"
                collection={foo}
                value={listName}
                defaultValue={['']}
                onValueChange={(e) => {
                    setListName(e.value)
                    setHasUpdates(true)
                }}
            >
                <SelectLabel textAlign="left">Select list name</SelectLabel>
                <SelectTrigger>
                    <SelectValueText placeholder="Select name" />
                </SelectTrigger>
                <SelectContent>
                    {foo?.items?.map((item: any) => (
                        <SelectItem item={item.value} key={item.value}>
                            {item.value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </SelectRoot>
        </div>
        }
        </>
    )
}

export default ListNameInput