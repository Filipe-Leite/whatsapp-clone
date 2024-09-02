import { Grid, GridItem, Tabs, TabPanels, TabPanel, TabList, Tab } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { createContext, useState } from "react";

export const FriendContext = createContext();

const Home = () => {
    const [friendList, setFriendList] = useState([
        { username: "FIlipe", connected: true },
        { username: "John Doe", connected: false },
        { username: "Stevend", connected: true },
    ]);

    return (
        <FriendContext.Provider value={{ friendList, setFriendList }}>
                <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
                    <GridItem colSpan="3" borderRight="1px solid gray">
                            <Sidebar />
                    </GridItem>
                    <GridItem colSpan="7">
                        <TabPanels>
                            <TabPanel>
                                <Chat />
                            </TabPanel>
                        </TabPanels>
                    </GridItem>
                </Grid>
        </FriendContext.Provider>
    );
};

export default Home;
