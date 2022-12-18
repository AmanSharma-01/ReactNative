import React  from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AvailableShifts from "../Screens/AvailableShifts";
import MyShifts from "../Screens/MyShifts";
import Colors from "../Constants/Colors";

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
    const MyShift = (): JSX.Element => {
        return <MyShifts />
    };
    const Available = (): JSX.Element => {
        return <AvailableShifts />
    };
    return (
            <Tab.Navigator 
                screenOptions={() => ({
                    tabBarIcon: () => {
                    return null;
                    },
                    tabBarLabelStyle: {
                        fontSize: 14,
                        marginBottom: 14,
                    },
                    tabBarActiveTintColor: Colors.activeTint,
                    tabBarInActiveTintColor: 'gray',
                    headerShown: false,
                })}>
                <Tab.Screen name="My shifts" component={MyShift} />
                <Tab.Screen name="Available shifts" component={Available} />
            </Tab.Navigator>
    )
}

export default TabNavigator;