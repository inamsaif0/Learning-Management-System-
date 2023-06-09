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
// import { FlatList } from './FlatList';
import FlatListDemo from './FlatList';
import Listpdf from './Listpdf'
import pdf from './assets/pdf.png'
import Listaudio from './Listaudio';
import Quiz from './Quiz';

function Example() {

    return (
      <Tabs
      style={{backgroundColor:'white', marginTop:5, borderRadius:10}} 
      theme={{ colors: { primary: '#800000' } }}
        // defaultIndex={0} // default = 0
        uppercase={false} // true/false | default=true | labels are uppercase
        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
        // iconPosition // leading, top | default=leading
        // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
        // dark={false} // works the same as AppBar in react-native-paper
        // theme={} // works the same as AppBar in react-native-paper
        // mode="scrollable" // fixed, scrollable | default=fixed
        onChangeIndex={(newIndex) => {}} // react on index change
        // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
        disableSwipe={false} // (default=false) disable swipe to left/right gesturesz
      >
        <TabScreen label="Data" icon="book">
           <Documents />
        </TabScreen>
        <TabScreen label="Audio" icon="music">
          {/* <FlatList/> */}
          {/* <FlatListDemo/> */}
          <Listaudio />
        </TabScreen>
        <TabScreen
          label="Quiz"
          icon="lock"
          // style={{Color:"#800000"}}
          // optional props
          // onPressIn={() => {
          //   console.log('onPressIn explore');
          // }}
          // onPress={() => {
          //   console.log('onPress explore');
          // }}
        >
           <Quiz/>
        </TabScreen>
      </Tabs>
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
// function Quiz() {
//   const goTo = useTabNavigation();
//   const index = useTabIndex();
//   return (
//     <View style={{ flex:1 }}>
//       <Title>Explore</Title>
//       <Paragraph>Index: {index}</Paragraph>
//       <Button onPress={() => goTo(1)}>Go to Flights</Button>
//     </View>
//   );
// }

export default Example;