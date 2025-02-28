import React from 'react';
import ListComponent from "./list";
import ListFieldSet from "./field";
import { Flex } from "@chakra-ui/react";

const ListWrapper = (props) => {
    const {setHasUpdates, toDos, fetchTodos, setTodos} = props
    return (
        <>
            <Flex direction="column" gap="8">
                <ListFieldSet checkUpdates={setHasUpdates} listItems={toDos} />
                <ListComponent
                    refreshList={fetchTodos}
                    checkUpdates={setHasUpdates}
                    listItems={toDos}
                    setListItems={setTodos}
                />
            </Flex>
        </>
    )
}

export default ListWrapper;