import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  useIonPopover,
  IonButton,
  IonButtons,
  IonIcon,
  IonList,
} from "@ionic/react";
import { qrCode } from "ionicons/icons";
import { Storage } from "@capacitor/storage";

import { RouteComponentProps } from "react-router-dom";
import "./DemoPage.css";
import { useQuery, gql } from "@apollo/client";
import QRCode from "react-qr-code";

const DEMO = gql`
  query demo($id: String!) {
    demo(id: $id) {
      description
      date
      location
      title
      time
      id
    }
  }
`;

interface DemoPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const DemoPage: React.FC<DemoPageProps> = ({ match }) => {
  const PopoverQRCode: React.FC<{
    onHide: () => void;
  }> = ({ onHide }) => <QRCode value={data.demo.id} />;

  const { loading, error, data } = useQuery(DEMO, {
    variables: { id: match.params.id },
  });
  const [present, dismiss] = useIonPopover(PopoverQRCode, {
    onHide: () => dismiss(),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const remember = async () => {
    const { value } = await Storage.get({ key: "demoIds" });
    if (value) {
      const valueObject = JSON.parse(value);
      const exists = valueObject.includes(data.demo.id);
      if (!exists) {
        await Storage.set({
          key: "demoIds",
          value: JSON.stringify([...valueObject, data.demo.id]),
        });
      }
    } else {
      await Storage.set({
        key: "demoIds",
        value: JSON.stringify([data.demo.id]),
      });
    }
  };

  const forget = async () => {
    const { value } = await Storage.get({ key: "demoIds" });
    if (value) {
      const valueObject = JSON.parse(value);
      const filteredObject = valueObject.filter(
        (elem) => elem !== data.demo.id
      );
      await Storage.set({
        key: "demoIds",
        value: JSON.stringify(filteredObject),
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{data.demo.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton
              expand="block"
              onClick={(e) => present({ event: e.nativeEvent })}
            >
              <IonIcon icon={qrCode}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>Date: {data.demo.date}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Time: {data.demo.time}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Location: {data.demo.location}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Description: {data.demo.description}</IonLabel>
          </IonItem>
          <IonButton
            expand="block"
            fill="clear"
            color="transparent"
            onClick={remember}
          >
            Remember
          </IonButton>
          <IonButton
            expand="block"
            fill="clear"
            color="transparent"
            onClick={forget}
          >
            Forget
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DemoPage;
