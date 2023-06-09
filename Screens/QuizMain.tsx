import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Answerquestions from '../Components/answer-questions';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import postDataToServer from '../services/api';
import End from './End';
import Timer from '../Components/Timer';

export default function QuizMain({ timer, end,navigation }) {

    const [index, setIndex] = useState<number>(0);
    const [selected, setSelected] = useState({});
    const [submit, setSubmit] = useState(false);
    const [collect, setCollect] = useState(false);

    useEffect(() => {
        console.log(selected)
    }, [selected])

    useEffect(() => {
        submitHandler()
    }, [index])

    function next() {
        if (index != test?.length - 1) {

            setIndex(index + 1)
        }

    }

    function previous() {
        if (index != 0) {
            setSubmit(false)

            setIndex(index - 1)
        }

    }


    function submitHandler() {
        if (index === test?.length - 1) {
            setSubmit(true)
        }

    }

    interface Itest {
        questionNumber: number,
        question: string,
        options: Array<string>,
        type: string
    }

    const test: Itest[] = [

        {
            questionNumber: 1,
            question: "What Is Your Name ?",
            options: ["Maaz", "Ammar", "Furqan"],
            type: "Radio"
        },
        {
            questionNumber: 2,
            question: "What Is Your Age ?",
            options: ["Maaz", "Ammar", "Furqan"],
            type: "openEnded"
        },
        {
            questionNumber: 3,
            question: "What Is Your Gender ?",
            options: ["Maaz", "Ammar", "Furqan"],
            type: "checkBox"
        },
    ]

    const getSelected = (selected: SetStateAction<{}>) => {
        setSelected(selected);
    }

    function updateServer() {
        console.log(createFinalObject(test, selected))
        postDataToServer(createFinalObject(test, selected))
        setCollect(true);
    }


    function createFinalObject(questionPaper: Array<Itest>, selected: any) {


        let finalObject = test.map((id: object, index_value: number) => {
            return {
                question: questionPaper[index_value].question,
                get answer() {
                    if (typeof (selected[`${index_value}`]) === 'string') {
                        return selected[`${index_value}`];
                    }
                    else if (typeof (selected[`${index_value}`]) === 'number') {
                        return questionPaper[index_value].options[selected[`${index_value}`]]
                    }




                    else if (selected[`${index_value}`]?.constructor === Array) {
                        console.log("hello array")
                        let answerStrings: Array<string> = [];
                        selected[`${index_value}`].map((checks: boolean, index: number) => {
                            if (checks) {
                                answerStrings.push(questionPaper[index_value].options[index])
                            }
                        }
                        )
                        return answerStrings.toString();
                    }
                    else {

                        return "no type found"
                    }




                }

            }
        })
        return finalObject

    }

    return (
        <>
            {end||collect?<End navigation={navigation}/>:
                <ScrollView >
                    <StatusBar style="auto" />
                    <>
                        <Timer time={timer} />
                        <Answerquestions
                            collect={collect}
                            index={index}
                            questionNumber={test[index].questionNumber}
                            question={test[index].question}
                            options={test[index].options}
                            type={test[index].type}
                            getSelected={getSelected}
                        />
                        {
                            submit ?
                                <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 10 }}>


                                    <Pressable style={{ backgroundColor: "green", height: 50, borderRadius: 10, width: "80%", justifyContent: "center", alignItems: 'center' }}
                                        onPress={() => updateServer()}
                                    >
                                        <Text style={{ color: "white" }}>
                                            Submit
                                        </Text>
                                    </Pressable>
                                </View>
                                : null

                        }
                        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingTop: 50 }}>
                            <Pressable
                                style={{ backgroundColor: "#800000", height: 50, borderRadius: 10, width: 100, justifyContent: "center", alignItems: 'center' }}



                                onPress={() => previous()}
                            ><Text
                                style={{ color: "white" }}
                            >
                                    Previous
                                </Text>
                            </Pressable>
                            <Pressable
                                style={{ backgroundColor: "#800000", height: 50, borderRadius: 10, width: 100, justifyContent: "center", alignItems: 'center' }}

                                onPress={() => next()}
                            ><Text
                                style={{ color: "white" }}
                            >
                                    Next
                                </Text>
                            </Pressable>
                        </View></>




                </ScrollView>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});
