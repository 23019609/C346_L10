// =============== LESSON 10 EXERCISE 1 ===============
//
// import React, { useState, useEffect } from "react";
// import { FlatList, StatusBar, Text, TextInput, View } from "react-native";
//
// // Create a new variable named originalData - Exercise 1C
// let originalData = [];
//
// const App = () => {
//     const [mydata, setMyData] = useState([]);
//
//     // Add useEffect() - Exercise 1B
//     useEffect(() => {
//         // Add fetch() - Exercise 1A
//         fetch("https://jsonplaceholder.typicode.com/albums/")
//             .then((response) => {
//                 return response.json();
//             })
//             .then((myJson) => {
//                 if (originalData.length < 1) {
//                     setMyData(myJson);
//                     originalData = myJson;
//                 }
//             });
//     }, []);
//
//     // Create the FilterData() function
//     const FilterData = (text) => {
//         if (text != "") {
//             let myFilteredData = originalData.filter((item) =>
//                 item.title.includes(text),
//             );
//             setMyData(myFilteredData);
//         } else {
//             setMyData(originalData);
//         }
//     };
//
//     const renderItem = ({ item, index }) => {
//         return (
//             <View>
//                 <Text style={{ borderWidth: 1 }}>{item.title}</Text>
//             </View>
//         );
//     };
//
//     return (
//         <View>
//             <StatusBar />
//             <Text>Search:</Text>
//             <TextInput
//                 style={{ borderWidth: 1 }}
//                 onChangeText={(text) => {
//                     FilterData(text);
//                 }}
//             />
//             <FlatList data={mydata} renderItem={renderItem} />
//         </View>
//     );
// };
//
// export default App;

// =============== LESSON 10 EXERCISE 2 ===============
import React, { useState, useEffect } from "react";
import {
    FlatList,
    StatusBar,
    Text,
    TextInput,
    View,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 20,
        backgroundColor: "#789dbc",
        width: 420,
        alignSelf: "center",
    },
    headerText: {
        padding: 10,
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        color: "#e7f5ff",
    },
    parentContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#fef9f2",
        borderColor: "#f7efcb",
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 20,
    },

    titleStyle: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 17,
    },
    textStyle: {
        fontSize: 15,
        color: "#2e2030b3",
        marginTop: 3,
    },
    textContainer: {
        marginTop: 5,
        padding: 10,
    },
    iconStyle: {
        flex: 0,
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight:20,
    },
});

let originalData = [];

const App = () => {
    const [mydata, setMyData] = useState([]);

    useEffect(() => {
        fetch(
            "https://mysafeinfo.com/api/data?list=famouspaintings&format=json&case=default",
        )
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMyData(myJson);
                    originalData = myJson;
                }
            });
    }, []);

    const FilterData = (input) => {
        let text = input.toLowerCase();
        if (text !== "") {
            let myFilteredData = originalData.filter(
                (item) =>
                    item.PaintingName.toLowerCase().includes(text) ||
                    item.Artist.toLowerCase().includes(text) ||
                    item.Location.toLowerCase().includes(text) ||
                    item.City.toLowerCase().includes(text)
            );
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.parentContainer}>
                <View style={styles.iconStyle}>
                    <Text style={{color: "#D4AF37", fontWeight: "bold"}}>
                        <Icon name="medal" color="gold" /> {item.Rank}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.titleStyle}>{item.PaintingName}</Text>
                    <Text style={styles.textStyle}><Icon name="paintbrush" color="#808080"/> By {item.Artist} ({item.Year})</Text>
                    <Text style={styles.textStyle}><Icon name="location-dot" color="#808080" /> {item.City}, {item.Location}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 150 }}>
            <StatusBar />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Famous Paintings</Text>
            </View>
            <TextInput
                style={{
                    borderWidth: 1,
                    marginBottom: 20,
                    borderRadius: 50,
                    borderColor: "#ccc",
                    textAlign: "center",
                }}
                onChangeText={(text) => {
                    FilterData(text);
                }}
                placeholder= "Filter By Painting, Artist, or Location"
            />
            <FlatList data={mydata} renderItem={renderItem} />
        </View>
    );
};

export default App;
