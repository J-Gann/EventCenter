import {
  IonContent,
  IonHeader,
  IonButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import DemoCardsComponent from "../components/DemoCardsComponent";
import { add, scan } from "ionicons/icons";
import "./HomePage.css";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

const HomePage: React.FC = () => {
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink={`/scan`}>
              <IonIcon icon={scan}></IonIcon>
            </IonButton>
            <IonButton routerLink={`/demo/create`}>
              <IonIcon icon={add}></IonIcon>
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
        <DemoCardsComponent />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
