import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Models } from "react-native-appwrite";

import Comment from "@/components/Comment";
import { facilities as facilitiesData } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";

import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";

interface PropertyDocument extends Models.Document {
  name: string;
  type: string;
  description: string;
  address: string;
  image: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  facilities: string[];
  agent: string | Models.Document;
  reviews: Models.Document[]; // Now guaranteed to be Documents, not IDs
  gallery: Models.Document[]; // Now guaranteed to be Documents, not IDs
  geolocation?: string;
}

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [wishlist, setWishlist] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const windowHeight = Dimensions.get("window").height;

  const { data: property, loading, error } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });


  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0061FF" />
        <Text className="text-black-300 text-base font-rubik mt-4">
          Carregando propriedade...
        </Text>
      </View>
    );
  }

  if (error || !property) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-5">
        <Image source={icons.info} className="size-16 mb-4" />
        <Text className="text-black-300 text-xl font-rubik-bold text-center mb-2">
          Propriedade não encontrada
        </Text>
        <Text className="text-black-200 text-base font-rubik text-center mb-6">
          {error || "Não foi possível carregar a propriedade. Tente novamente."}
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary-300 px-6 py-3 rounded-full"
        >
          <Text className="text-white text-base font-rubik-bold">Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const typedProperty = property as PropertyDocument;
  const agent =
    typeof typedProperty.agent === "string"
      ? null
      : (typedProperty.agent as Models.Document);

  // Reviews are now guaranteed to be Documents (not strings)
  const reviews = Array.isArray(typedProperty.reviews)
    ? typedProperty.reviews
    : [];

  // Gallery is now guaranteed to be Documents (not strings)
  const gallery = Array.isArray(typedProperty.gallery)
    ? typedProperty.gallery
    : [];

  const getFacilityIcon = (facilityName: string) => {
    const facility = facilitiesData.find(
      (f) => f.title.toLowerCase() === facilityName.toLowerCase()
    );
    return facility?.icon || icons.info;
  };

  const handleShare = () => {
    Alert.alert(
      "Compartilhar",
      "Compartilhar esta propriedade?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Whatsapp",
          onPress: () => console.log("Compartilhando no Whatsapp"),
        },
        {
          text: "Email",
          onPress: () => console.log("Compartilhando por Email"),
        },
      ]
    );
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
      >
        {/* Header Image Section */}
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          {gallery.length > 0 ? (
            <Image
              source={{
                uri:
                  gallery[activeGalleryIndex]?.image || typedProperty.image,
              }}
              className="size-full"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{ uri: typedProperty.image }}
              className="size-full"
              resizeMode="cover"
            />
          )}

          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          {/* Header Controls */}
          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center shadow-md shadow-black-100/20"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={() => setWishlist(!wishlist)}
                  className="bg-white/90 rounded-full p-2.5"
                >
                  <Image
                    source={icons.heart}
                    className="size-6"
                    tintColor={wishlist ? "#E55039" : "#191D31"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleShare}
                  className="bg-white/90 rounded-full p-2.5"
                >
                  <Image source={icons.send} className="size-6" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Gallery Indicator */}
          {gallery.length > 1 && (
            <View className="absolute bottom-4 inset-x-7 z-40">
              <FlatList
                data={gallery}
                renderItem={({ index }) => (
                  <TouchableOpacity
                    onPress={() => setActiveGalleryIndex(index)}
                    className={`h-1 rounded-full mr-2 ${index === activeGalleryIndex
                        ? "bg-primary-300 w-8"
                        : "bg-white/50 w-2"
                      }`}
                  />
                )}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        </View>

        {/* Content Section */}
        <View className="px-5 mt-7 flex gap-4">
          {/* Property Title & Type */}
          <View className="gap-2">
            <Text className="text-2xl font-rubik-extrabold text-black-300">
              {typedProperty.name}
            </Text>

            <View className="flex flex-row items-center gap-3">
              <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
                <Text className="text-xs font-rubik-bold text-primary-300">
                  {typedProperty.type}
                </Text>
              </View>

              <View className="flex flex-row items-center gap-2">
                <Image source={icons.star} className="size-5" />
                <Text className="text-black-200 text-sm font-rubik-medium">
                  {(typedProperty.rating || 0).toFixed(1)} ({reviews.length}{" "}
                  avaliações)
                </Text>
              </View>
            </View>
          </View>

          {/* Property Features */}
          <View className="flex flex-row items-center gap-7 bg-primary-100/40 p-4 rounded-xl">
            {/* Bedrooms */}
            <View className="flex flex-row items-center">
              <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
                <Image source={icons.bed} className="size-4" />
              </View>
              <View className="ml-2">
                <Text className="text-black-200 text-xs font-rubik-medium">
                  Quartos
                </Text>
                <Text className="text-black-300 text-sm font-rubik-bold">
                  {typedProperty.bedrooms}
                </Text>
              </View>
            </View>

            {/* Bathrooms */}
            <View className="flex flex-row items-center">
              <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
                <Image source={icons.bath} className="size-4" />
              </View>
              <View className="ml-2">
                <Text className="text-black-200 text-xs font-rubik-medium">
                  Banheiros
                </Text>
                <Text className="text-black-300 text-sm font-rubik-bold">
                  {typedProperty.bathrooms}
                </Text>
              </View>
            </View>

            {/* Area */}
            <View className="flex flex-row items-center">
              <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
                <Image source={icons.area} className="size-4" />
              </View>
              <View className="ml-2">
                <Text className="text-black-200 text-xs font-rubik-medium">
                  Área
                </Text>
                <Text className="text-black-300 text-sm font-rubik-bold">
                  {typedProperty.area} m²
                </Text>
              </View>
            </View>
          </View>

          {/* Agent Section */}
          {agent && (
            <View className="w-full border-t border-primary-200 pt-7">
              <Text className="text-black-300 text-xl font-rubik-bold mb-4">
                Agente Imobiliário
              </Text>

              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center flex-1">
                  <Image
                    source={{ uri: agent.avatar || images.japan }}
                    className="size-14 rounded-full bg-primary-100"
                    onError={() => console.log("Avatar load error")}
                  />

                  <View className="flex flex-col items-start justify-center ml-3 flex-1">
                    <Text className="text-lg text-black-300 text-start font-rubik-bold">
                      {agent.name || "Agente"}
                    </Text>
                    <Text
                      className="text-sm text-black-200 text-start font-rubik-medium"
                      numberOfLines={1}
                    >
                      {agent.email || "email@example.com"}
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row items-center gap-3">
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert("Chat", "Abrir conversa com agente?")
                    }
                    className="bg-primary-100 p-3 rounded-full"
                  >
                    <Image source={icons.chat} className="size-5" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert("Ligar", "Ligar para o agente?")
                    }
                    className="bg-primary-300 p-3 rounded-full"
                  >
                    <Image
                      source={icons.phone}
                      className="size-5"
                      tintColor="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Description Section */}
          <View className="gap-2">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Descrição
            </Text>
            <Text className="text-black-200 text-base font-rubik leading-6">
              {typedProperty.description || "Nenhuma descrição disponível."}
            </Text>
          </View>

          {/* Facilities Section */}
          {typedProperty.facilities &&
            typedProperty.facilities.length > 0 && (
              <View className="gap-3">
                <Text className="text-black-300 text-xl font-rubik-bold">
                  Comodidades
                </Text>

                <View className="flex flex-row flex-wrap items-start justify-start gap-4">
                  {typedProperty.facilities.map(
                    (facility: string, index: number) => (
                      <View
                        key={`${facility}-${index}`}
                        className="flex flex-col items-center max-w-20"
                      >
                        <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center mb-2">
                          <Image
                            source={getFacilityIcon(facility)}
                            className="size-6"
                          />
                        </View>

                        <Text
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          className="text-black-300 text-xs text-center font-rubik"
                        >
                          {facility}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>
            )}

          {/* Gallery Section */}
          {gallery.length > 0 && (
            <View className="gap-3">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-black-300 text-xl font-rubik-bold">
                  Galeria
                </Text>
                <Text className="text-primary-300 text-sm font-rubik-bold">
                  {activeGalleryIndex + 1}/{gallery.length}
                </Text>
              </View>

              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={gallery}
                keyExtractor={(item, index) => item.$id || index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => setActiveGalleryIndex(index)}
                    className={`rounded-xl overflow-hidden ${index === activeGalleryIndex
                        ? "border-2 border-primary-300"
                        : ""
                      }`}
                  >
                    <Image
                      source={{ uri: item.image }}
                      className="size-40"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
                contentContainerClassName="flex gap-4"
              />
            </View>
          )}

          {/* Location Section */}
          <View className="gap-3">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Localização
            </Text>
            <View className="flex flex-row items-start justify-start gap-2">
              <Image source={icons.location} className="w-5 h-5 mt-1" />
              <Text className="text-black-200 text-sm font-rubik flex-1">
                {typedProperty.address || "Endereço não disponível"}
              </Text>
            </View>

            <Image
              source={images.map}
              className="h-52 w-full mt-3 rounded-xl"
              resizeMode="cover"
            />
          </View>

          {/* Reviews Section - Enhanced */}
          {reviews.length > 0 && (
            <View className="gap-4 border-t border-primary-200 pt-7">
              {/* Reviews Header */}
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-3">
                  <Image source={icons.star} className="size-6" />
                  <View>
                    <Text className="text-black-300 text-lg font-rubik-bold">
                      {(typedProperty.rating || 0).toFixed(1)}
                    </Text>
                    <Text className="text-black-200 text-xs font-rubik">
                      {reviews.length} avaliações
                    </Text>
                  </View>
                </View>

                {reviews.length > 3 && (
                  <TouchableOpacity
                    onPress={() => setShowAllReviews(!showAllReviews)}
                    className="bg-primary-100/40 px-3 py-1.5 rounded-full"
                  >
                    <Text className="text-primary-300 text-xs font-rubik-bold">
                      {showAllReviews ? "Ver menos" : "Ver todas"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Reviews List */}
              <View>
                {displayedReviews.map((review, index) => (
                  <Comment
                    key={review.$id || index}
                    item={review}
                    variant="full"
                  />
                ))}
              </View>

              {/* Show More Button */}
              {!showAllReviews && reviews.length > 3 && (
                <TouchableOpacity
                  onPress={() => setShowAllReviews(true)}
                  className="py-4 border-t border-primary-200 mt-2"
                >
                  <Text className="text-primary-300 text-center text-base font-rubik-bold">
                    Ver todas as {reviews.length} avaliações
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* No Reviews Message */}
          {reviews.length === 0 && (
            <View className="bg-primary-100/20 rounded-lg p-4 mt-7 border border-primary-200">
              <Text className="text-black-300 text-center font-rubik-bold mb-1">
                Sem avaliações ainda
              </Text>
              <Text className="text-black-200 text-center text-sm font-rubik">
                Seja o primeiro a avaliar esta propriedade após sua visita
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Booking Footer */}
      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7 shadow-lg shadow-black-100/10">
        <View className="flex flex-row items-center justify-between gap-4">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium mb-1">
              Valor
            </Text>
            <Text className="text-primary-300 text-start text-2xl font-rubik-bold">
              ${(typedProperty.price || 0).toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3.5 rounded-full active:bg-primary-400 shadow-md shadow-primary-300/30">
            <Text className="text-white text-lg text-center font-rubik-bold">
              Agendar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;