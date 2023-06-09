import React from 'react'
import { SafeAreaView,Text,Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export default function End({navigation,pass,score,total}) {
  return (
    <>
       <SafeAreaView
                    style={{
                        alignItems: 'center', flexDirection: 'column',margin:10
                    }}
                >
                    {pass?(<>
                        <AntDesign name="Trophy" size={24} color="black" />
                        <Text style={{ color: "black", fontSize: 40, textAlign: "center", paddingVertical: 50 }}>
                        Conratulations you Passed with a Score of {score} points out of {total}
                    </Text>
                    </>
                    ):
                    (<Text style={{ textAlign: "center", color: "grey", paddingVertical: 50 }}>
                        Please try again you need to score 40% you scored {score} points out of {total}   
                    </Text>)
                    }
                    <Pressable
                        style={{ backgroundColor: "#800000", height: 50, borderRadius: 10, width: 100, justifyContent: "center", alignItems: 'center' }}
                        onPress={()=>{navigation.navigate('Home')}}

                    >
                        <Text
                            style={{ color: "white" }}
                        >
                            Go Home
                        </Text>
                    </Pressable>
                </SafeAreaView>
    </>
  )
}
