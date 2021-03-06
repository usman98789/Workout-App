import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard
} from "react-native";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HoldWorkout from "./components/HoldWorkouts";
import HoldNote from "./components/HoldNote";
export default function App() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<AppTabNavigator />
		</SafeAreaView>
	);
}

function LogScreen() {
	const [note, setNote] = useState("");
	const [NoteArray, setNoteArray] = useState([]);
	const [date, setDate] = useState("");

	const addNote = () => {
		setNoteArray(NoteArray => [
			...NoteArray,
			{ id: Math.random().toString(), Note: note, Date: date }
		]);
	};

	const setnote = x => {
		setNote(x);
	};

	const setdate = d => {
		setDate(d);
	};

	let notes = NoteArray.map((val, key) => {
		return (
			<HoldNote
				key={key}
				keyval={key}
				val={val}
				note={setnote}
				date={setdate}
			/>
		);
	});

	return (
		<View style={styles.container}>
			<View style={styles.whiteColor}>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={addNote.bind(this)}
					style={styles.TouchableOpacity}
				>
					<Icon name="ios-add" color="purple" size={45} />
				</TouchableOpacity>

				<View style={styles.header}>
					<Text style={styles.headerTitle}>Workout Notes</Text>
				</View>
			</View>
			<ScrollView style={styles.scrollViewStyle}>
				<View style={styles.color}>{notes}</View>
			</ScrollView>
		</View>
	);
}

function PRScreen() {
	const [PRArray, setPRArray] = useState([]);
	const [exName, setExName] = useState("");
	const [setsHold, setSetsHold] = useState([]);

	const addPR = () => {
		setPRArray(PRArray => [...PRArray, { exName: setsHold }]);
	};

	const setName = x => {
		setExName(x);
	};

	const setSets = y => {
		setSetsHold(y);
	};

	let PRs = PRArray.map((val, key) => {
		return (
			<HoldWorkout
				key={key}
				keyval={key}
				val={val}
				exName={setName}
				setsHold={setSets}
			/>
		);
	});

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.container}>
				<View style={styles.whiteColor}>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={addPR.bind(this)}
						style={styles.TouchableOpacity}
					>
						<Icon name="ios-add" color="purple" size={45} />
					</TouchableOpacity>

					<View style={styles.header}>
						<Text style={styles.headerTitle}>Personal Records</Text>
					</View>
				</View>

				<ScrollView style={styles.scrollViewStyle}>
					<View style={styles.color}>{PRs}</View>
				</ScrollView>
			</View>
		</TouchableWithoutFeedback>
	);
}
const AppTabNavigator = createMaterialBottomTabNavigator(
	{
		PR: {
			screen: PRScreen,
			navigationOptions: {
				tabBarLabel: "Personal Records",
				tabBarIcon: ({ tintColor }) => (
					<Icon name="ios-star" color={tintColor} size={24} />
				),
				animationEnabled: false
			}
		},
		Log: {
			screen: LogScreen,
			navigationOptions: {
				tabBarLabel: "Workout Notes",
				tabBarIcon: ({ tintColor }) => (
					<Icon name="ios-book" color={tintColor} size={24} />
				),
				animationEnabled: false
			}
		}
	},
	{
		initialRouteName: "PR",
		order: ["PR", "Log"],
		activeTintColor: "purple"
	}
);

const styles = StyleSheet.create({
	whiteColor: {
		backgroundColor: "white",
		borderBottomColor: "#F0EFF5",
		borderBottomWidth: 2,
		height: 80
	},
	container: {
		flex: 1,
		borderBottomColor: "#F0EFF5",
		borderBottomWidth: 2
	},
	TouchableOpacity: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		right: 10,
		top: 28,
		height: 50,
		width: 50,
		zIndex: 1
	},
	header: {
		top: 35,
		paddingLeft: 20,
		position: "relative"
	},
	headerTitle: {
		color: "black",
		fontSize: 28,
		fontWeight: "bold"
	},
	color: {
		marginTop: 20
	},
	addButtonText: {
		color: "white",
		fontSize: 24
	}
});
