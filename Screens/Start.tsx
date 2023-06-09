import React, { useState, useEffect, useRef } from 'react'
import { Pressable, SafeAreaView, Text } from 'react-native'
import QuizMain from './QuizMain'


export default function Start({navigation,route}) {
    const {updateCompleted,id}=route.params;

    const testTime = '1:00:00';
    function StringToTime(time: string): number {
        let timeSplit = time.split(':')
        let h = parseInt(timeSplit[0])
        let m = parseInt(timeSplit[1])
        let s = parseInt(timeSplit[2])
        return ((h * 3600) + (m * 60) + s) * 1000

    }

    const [startQuiz, setStartQuiz] = useState<boolean>(false);
    const [endQuiz, setEndQuiz] = useState<boolean>(false)

   


    useEffect(() => {
        if (startQuiz) {
            const timer = setTimeout(() => {
                setStartQuiz(false)
                setEndQuiz(true);
                updateCompleted(id,false)
            }, StringToTime(testTime));
            console.log(timer + 'left')

            return () => clearTimeout(timer);

        }
    }, [startQuiz]);



    return (
        <>
            {endQuiz?(<QuizMain navigation={navigation} end={endQuiz} timer={testTime} updateCompleted={updateCompleted} id={id}/>):(startQuiz ? (<QuizMain navigation={navigation} end={false} timer={testTime} updateCompleted={updateCompleted} id={id} />) :
                (<SafeAreaView
                    style={{
                        alignItems: 'center', flexDirection: 'column'
                    }}
                >

                    <Text style={{ color: "black", fontSize: 60, textAlign: "center", paddingVertical: 50 }}>
                        Start Quiz?
                    </Text>
                    <Text style={{ textAlign: "center", color: "grey", paddingVertical: 50 }}>
                        Once You Press The Start Button The Timer Will Start
                    </Text>
                    <Pressable
                        style={{ backgroundColor: "#800000", height: 50, borderRadius: 10, width: 100, justifyContent: "center", alignItems: 'center' }}
                        onPress={() => setStartQuiz(true)}

                    >
                        <Text
                            style={{ color: "white" }}
                        >
                            Start Quiz
                        </Text>
                    </Pressable>
                </SafeAreaView>))
            }
        </>
    )
}
