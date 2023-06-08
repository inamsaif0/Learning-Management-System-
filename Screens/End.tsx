import React from 'react'
import { SafeAreaView,Text,Pressable } from 'react-native'

export default function End({navigation}) {
  return (
    <>
       <SafeAreaView
                    style={{
                        alignItems: 'center', flexDirection: 'column',margin:10
                    }}
                >

                    <Text style={{ color: "black", fontSize: 40, textAlign: "center", paddingVertical: 50 }}>
                        The Quiz Has Ended Please Wait For Your Results
                    </Text>
                    <Text style={{ textAlign: "center", color: "grey", paddingVertical: 50 }}>
                        Check Back Shortly Your Marks Will Appear Once Your Teacher Finishes Checking
                    </Text>
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
