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

function Example({tabId}) {

    return (
      <>
      

      <Tabs
      style={{backgroundColor:'white', marginTop:5, borderRadius:10}} 
      theme={{ colors: { primary: '#5c0931' } }}
      uppercase={false}
      onChangeIndex={(newIndex) => {}}  
      disableSwipe={false} 
      defaultIndex={tabId-1}
      >
        <TabScreen label="Content" icon="file-document">
           <Documents />
        </TabScreen>
        <TabScreen label="Audio" icon="record-rec">
          <Record />
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
function Recordings() {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <View style={{ flex:1 }}>
      <Title>Explore</Title>
      <Paragraph>Index: {index}</Paragraph>
      <Button onPress={() => goTo(1)}>Go to Flights</Button>
    </View>
  );
}

export default Example;