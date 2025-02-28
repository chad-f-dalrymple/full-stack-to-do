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
    const {listItems, setCategory, category, setHasUpdates} = props
    const removeDuplicates = (arr, key) => {
        const seen = new Set();
        return arr.filter(item => {
          const value = item[key];
          if (seen.has(value)) {
            return false;
          }
          seen.add(value);
          return true;
        });
      }
    const newListItems = removeDuplicates(listItems, 'category')
    const categories = newListItems.map(i => {
        return {"label": i.category, "value" :i.category}
    }).concat({"label": "All", "value": "All"})
    const collection = createListCollection({
        items: categories
    })


    return (
        <>
       {categories.length > 0 && <div>
            <SelectRoot
                color="black"
                size="sm"
                collection={collection}
                value={category}
                defaultValue={['']}
                onValueChange={(e) => {
                    setCategory(e.value)
                    setHasUpdates(true)
                }}
            >
                <SelectLabel textAlign="left">Category</SelectLabel>
                <SelectTrigger>
                    <SelectValueText placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    {collection?.items?.map((item: any) => (
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