import {
  Button,
  Title,
  Paragraph,
} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import { View } from 'native-base';
import Listpdf from './Listpdf'
import pdf from './assets/pdf.png'
import Quiz from './Quiz';
import Record from './Screens/Record';
import ListRecordings from './Screens/listRercordings';
import React from 'react';

function Example({tabId}) {

    return (
      <>
      

      <Tabs
      style={{backgroundColor:'white', marginTop:15, borderRadius:10}} 
      theme={{ colors: { primary: '#5c0931' } }}
      uppercase={false}
      defaultIndex={tabId-1}
      disableSwipe={false} 
      >
        <TabScreen label="Content" icon="file-document">
           <Documents />
        </TabScreen>
        <TabScreen label="Audio" icon="record-rec">
          <View style={{flex:0.9}}>

          <ListRecordings />
          </View>
        </TabScreen>
        <TabScreen label="Quiz" icon="head-question">
           <Quiz/>
        </TabScreen>
      </Tabs>
        </>
    
    )
}

function Documents() {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <View style={{ flex:1 }}>
      <Listpdf image={pdf}/>
    </View>
  );
}


export default Example;