import { Button, Input, LinearProgress, List, ListItem, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useRef, useState } from "react";
import { callApi } from "../utils/apiUtils";

// ApplicationPage component
export default function ApplicationPage() {
    const [songData, setSongData] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [valueList, setValueList] = useState([]);
    const valueListRef = useRef(valueList);
    const [options, setOptions] = useState({});
    const randomListRef = useRef(options?.randomList);

    const addRandomSong = async () => {
        const request = {
            songName: "Random Song - " + Math.random().toString(),
        };
        const response = await callApi('http://localhost:1000/song/add', 'PUT', JSON.stringify(request));
        console.log('Response from API:', response);
    }

    const handleLoadSongs = async () => {
        const response = await callApi('http://localhost:1000/inquiry/getAllSongs', 'GET');
        console.log('Response from API:', response);
    };

    const onFirstValueChange = (event) => {
        setInputValue(event.target.value);
    };
    const addInputValueToList = () => {
        setValueList(prevList => {
            const newList = [...prevList, inputValue];
            valueListRef.current = newList;
            return newList;
        });
    };

    const addRandomValueToList = () => {
        const randomValue = Math.random().toString();
        const list = options?.randomList || [];
        randomListRef.current = options?.randomList || [];
        list.push(randomValue);
        setOptions(prev => ({ ...prev, randomList: list }));
    };
    const displayRandomList = () => {
        const list1 = options?.randomList || [];
        const list2 = randomListRef.current || [];
        console.log('Random Lists', {  list1, list2 });
    }

    return (
        <div>
            <Button onClick={addRandomSong}>Add Random Song</Button>
            <Button onClick={handleLoadSongs}>Load Songs</Button>
            <br />
            <Input placeholder="First value..." onChange={onFirstValueChange} />
            <Input placeholder="Second value..." disabled={true} value={inputValue} />
            <Button onClick={addInputValueToList}>Add to List</Button>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            {valueListRef.current.map((value, index) => (
                                <TableCell key={index}>
                                    {value}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <LinearProgress variant="determinate" value={options?.value} />
            <Button onClick={() => setOptions(prev => ({ ...prev, value: Math.random() * 100 }))}>
                Randomize Progress
            </Button>
            <br />
            <Button onClick={addRandomValueToList}>Add Random Value</Button>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <List>
                                {options?.randomList?.map((value, index) => (
                                    <ListItem key={index}>{value}</ListItem>
                                ))}
                            </List>
                        </TableCell>
                        <TableCell>
                            <List>
                                {randomListRef.current?.map((value, index) => (
                                    <ListItem key={index}>{value}</ListItem>
                                ))}
                            </List>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Button onClick={displayRandomList}>Log lists</Button>
        </div>
    );
};