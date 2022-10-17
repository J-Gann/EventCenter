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
} from "@ionic/react";
import { shareSocial } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

import { RouteComponentProps } from "react-router-dom";
import "./ScanPage.css";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useState, useEffect } from "react";

const DemoPage: React.FC = () => {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const page = document.getElementById("scanner-page");
    const showBackground = () => {
      if (page) page.style.visibility = "visible";
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
      document.removeEventListener("ionBackButton", showBackground);
    };

    const effect = async () => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        document.addEventListener("ionBackButton", showBackground);
        BarcodeScanner.hideBackground();
        if (page) page.style.visibility = "hidden";
        const result = await BarcodeScanner.startScan();
        if (page) page.style.visibility = "visible";
        BarcodeScanner.showBackground();
        if (result.content) setId(result.content);
      }
    };
    effect();

    return () => {
      document.removeEventListener("ionBackButton", showBackground);
    };
  });

  if (id === "") {
    return (
      <IonPage id="scanner-page">
        <IonHeader></IonHeader>
        <IonContent fullscreen></IonContent>
      </IonPage>
    );
  } else {
    return <Redirect to={`/demo/${id}`} />;
  }
};

export default DemoPage;
