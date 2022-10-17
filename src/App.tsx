import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "./pages/HomePage";
import DemoPage from "./pages/DemoPage";
import CreateDemoPage from "./pages/CreateDemoPage";
import ScanPage from "./pages/ScanPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/demo/:id" component={DemoPage} />
        <Route exact path="/demo/create" component={CreateDemoPage} />
        <Route exact path="/scan" component={ScanPage} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
