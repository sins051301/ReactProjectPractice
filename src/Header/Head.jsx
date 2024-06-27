import CoreConcepts from "./CoreConcepts";
import ButtonList from "./ButtonList";
import Section from "./Section";
import Tabs from "./Tabs";
function Head() {
  return (
    <>
      <CoreConcepts></CoreConcepts>
      <Tabs ButtonsContainer={Section} buttons={<ButtonList>ff</ButtonList>}>contents</Tabs>
    </>
  );
}

export default Head;
