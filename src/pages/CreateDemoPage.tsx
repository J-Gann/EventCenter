import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonItemDivider,
  IonInput,
  IonLabel,
  IonDatetime,
  IonButton,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import React, { useState } from "react";

import { RouteComponentProps } from "react-router-dom";
import "./CreateDemoPage.css";
import { useMutation, gql } from "@apollo/client";

const CREATE_DEMO = gql`
  mutation createDemo(
    $title: String!
    $description: String!
    $date: String!
    $location: String!
    $time: String!
  ) {
    createDemo(
      title: $title
      description: $description
      date: $date
      location: $location
      time: $time
    ) {
      id
    }
  }
`;

const CreateDemoPage: React.FC = () => {
  const [input, setInput] = useState<any>({});
  const [createDemo, { data, loading, error }] = useMutation(CREATE_DEMO);

  if (loading) return <p>"Submitting..."</p>;
  if (error) return <p>`Submission error! ${error.message}`</p>;
  if (data) return <Redirect to={`/demo/${data.createDemo.id}`} />;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItemDivider>Fill in Information about your event.</IonItemDivider>
          <IonItem>
            <IonLabel>Title</IonLabel>
            <IonInput
              value={input.title}
              placeholder="Event Title"
              onIonChange={(e) => {
                setInput((old) => {
                  return { ...old, title: e.detail.value! };
                });
              }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Description</IonLabel>
            <IonInput
              value={input.description}
              placeholder="Event Description"
              onIonChange={(e) => {
                setInput((old) => {
                  return { ...old, description: e.detail.value! };
                });
              }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Location</IonLabel>
            <IonInput
              value={input.location}
              placeholder="Berlin"
              onIonChange={(e) => {
                setInput((old) => {
                  return { ...old, location: e.detail.value! };
                });
              }}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetime
              displayFormat="DDDD MMM D, YYYY"
              placeholder="28.08.2020"
              value={input.date}
              onIonChange={(e) => {
                setInput((old) => {
                  return { ...old, date: e.detail.value! };
                });
              }}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Time</IonLabel>
            <IonDatetime
              displayFormat="HH:mm"
              placeholder="11:00"
              value={input.time}
              onIonChange={(e) => {
                setInput((old) => {
                  return { ...old, time: e.detail.value! };
                });
              }}
            ></IonDatetime>
          </IonItem>
        </IonList>
        <IonButton
          color="primary"
          onClick={() => {
            createDemo({ variables: { ...input } });
          }}
        >
          Submit
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateDemoPage;
