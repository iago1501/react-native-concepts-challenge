import React, { useEffect, useState } from "react";
import api from "./services/api";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRespositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id, type) {
    const response = await api.post(`repositories/${id}/like`, { type: type });

    const attRepositorie = response.data;

    const attRepositories = repositories.map((repositorie) =>
      repositorie.id === id ? attRepositorie : repositorie
    );

    setRespositories(attRepositories);
  }

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Repositório ${repositories.length + 1}`,
      url: "http://github.com/iago1501",
      techs: ["Node.js", "Express", "React", "React Native"],
    });

    const newRepositorie = response.data;

    setRespositories([...repositories, newRepositorie]);
  }

  const handleRemoveRepository = async (id) => {
    api.delete(`repositories/${id}`);
    const attRepositories = repositories.filter(
      (repositorie) => repositorie.id !== id
    );
    setRespositories(attRepositories);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(repositorie) => repositorie.id}
          renderItem={({ item: { id, title, techs, likes } }) => (
            <View style={styles.repositoryContainer}>
              <View style={styles.header}>
                <Text style={styles.repository}>{title}</Text>
                <TouchableOpacity
                  onPress={() => handleRemoveRepository(id)}
                  style={styles.remove}
                >
                  <Text>&#10008;</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.techsContainer}
              >
                {techs.map((tech) => (
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </ScrollView>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${id}`}
                >
                  {likes} {`curtida${likes === 1 ? '' : 's'}`}
                </Text>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => handleLikeRepository(id, "like")}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${id}`}
                >
                  <Text style={styles.likeButtonText}>Curtir &#128526;</Text>
                </TouchableOpacity>
                {likes > 0 && (
                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => handleLikeRepository(id, "unlike")}
                    // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                    testID={`unlike-button-${id}`}
                  >
                    <Text style={styles.likeButtonText}>
                      Descurtir &#128543;
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addbutton}
          onPress={handleAddRepository}
          // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
          testID={"add-button"}
        >
          <Text style={styles.addbuttonText}>Adicionar Repositório</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  remove: {
    padding: 5,
    height: 30,
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 0.5,
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  likeButton: {
    marginTop: 2,
  },
  likeButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#000",
    backgroundColor: "transparent",
    padding: 8,
    borderColor: "#f4cd06",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 2,
  },
  addbutton: {
    alignItems: "center",
    justifyContent: "center",
  },
  addbuttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    backgroundColor: "#f4cd06",
    padding: 10,
    margin: 10,
  },
});
