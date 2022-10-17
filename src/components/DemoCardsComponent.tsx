import "./DemoCardsComponent.css";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";
import { useState, useEffect } from "react";
import { useLazyQuery, gql, useQuery } from "@apollo/client";
import { isEqual } from "lodash";

const DEMO = gql`
  query demos($ids: [String!]) {
    demos(ids: $ids) {
      description
      date
      location
      title
      time
      id
    }
  }
`;

const DemoCards: React.FC = () => {
  const [ids, setIds] = useState<String[]>([]);
  const { loading, error, data } = useQuery(DEMO, {
    variables: { ids: ids },
  });

  useEffect(() => {
    const effect = async () => {
      let { value } = await Storage.get({ key: "demoIds" });
      if (value) {
        const idArray = JSON.parse(value);
        if (!isEqual(ids, idArray)) setIds(idArray);
      }
    };
    effect();
  });

  if (loading)
    return (
      <IonContent>
        {ids.map((id, index) => {
          return (
            <IonCard key={index}>
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonSkeletonText
                    animated
                    style={{ width: "30%" }}
                  ></IonSkeletonText>
                </IonCardSubtitle>
                <IonCardTitle>
                  <IonSkeletonText
                    animated
                    style={{ width: "10%" }}
                  ></IonSkeletonText>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonSkeletonText
                  animated
                  style={{ width: "50%" }}
                ></IonSkeletonText>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonContent>
    );

  if (error) return <p>Error :(</p>;

  const doRefresh = async (event) => {
    let { value } = await Storage.get({ key: "demoIds" });
    if (value) {
      const idArray = JSON.parse(value);
      setIds(idArray);
    }
    event.detail.complete();
  };

  if (!data) {
    return (
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <p>Nothing here.</p>
      </IonContent>
    );
  }
  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      {data.demos.map(({ id, date, title, description }) => {
        return (
          <IonCard key={id} routerLink={`/demo/${id}`}>
            <IonCardHeader>
              <IonCardSubtitle>Date: {date}</IonCardSubtitle>
              <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{description}</IonCardContent>
          </IonCard>
        );
      })}
    </IonContent>
  );
};

export default DemoCards;
