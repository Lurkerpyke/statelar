import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Models } from "react-native-appwrite";

import icons from "@/constants/icons";

interface Props {
    item: Models.Document;
    variant?: "compact" | "full";
}

const Comment = ({ item, variant = "full" }: Props) => {
    const [liked, setLiked] = useState(false);

    const getTimeAgo = (date: string) => {
        const now = new Date();
        const createdAt = new Date(date);
        const diffMs = now.getTime() - createdAt.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Hoje";
        if (diffDays === 1) return "Ontem";
        if (diffDays < 7) return `${diffDays}d atrás`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w atrás`;
        return `${Math.floor(diffDays / 30)}m atrás`;
    };

    const renderStars = (rating: number) => {
        return (
            <View className="flex flex-row items-center gap-1">
                {[...Array(5)].map((_, index) => (
                    <Image
                        key={index}
                        source={icons.star}
                        className="size-3.5"
                        tintColor={index < rating ? "#FDB022" : "#E0E0E0"}
                    />
                ))}
            </View>
        );
    };

    if (variant === "compact") {
        return (
            <View className="bg-primary-100/30 rounded-lg p-3 mb-3">
                <View className="flex flex-row items-start justify-between mb-2">
                    <View className="flex flex-row items-center flex-1">
                        <Image
                            source={{ uri: item.avatar }}
                            className="size-9 rounded-full"
                        />
                        <View className="ml-2 flex-1">
                            <Text className="text-sm font-rubik-bold text-black-300">
                                {item.name}
                            </Text>
                            {item.rating && renderStars(item.rating)}
                        </View>
                    </View>
                    <Text className="text-xs text-black-200 font-rubik">
                        {getTimeAgo(item.$createdAt)}
                    </Text>
                </View>

                <Text
                    className="text-xs text-black-200 font-rubik leading-4"
                    numberOfLines={3}
                >
                    {item.review}
                </Text>
            </View>
        );
    }

    return (
        <View className="flex flex-col items-start border-b border-primary-200 pb-5">
            <View className="flex flex-row items-start justify-between w-full mb-3">
                <View className="flex flex-row items-center flex-1">
                    <Image
                        source={{ uri: item.avatar }}
                        className="size-14 rounded-full bg-primary-100"
                    />
                    <View className="ml-3 flex-1">
                        <Text className="text-base text-black-300 font-rubik-bold">
                            {item.name}
                        </Text>
                        {item.rating && renderStars(item.rating)}
                        <Text className="text-xs text-black-200 font-rubik mt-1">
                            {getTimeAgo(item.$createdAt)}
                        </Text>
                    </View>
                </View>
            </View>

            <Text className="text-black-200 text-sm font-rubik leading-5 mb-3">
                {item.review}
            </Text>

            <View className="flex flex-row items-center gap-4">
                <TouchableOpacity
                    onPress={() => setLiked(!liked)}
                    className="flex flex-row items-center gap-1"
                >
                    <Image
                        source={icons.heart}
                        className="size-4"
                        tintColor={liked ? "#E55039" : "#0061FF"}
                    />
                    <Text
                        className={`text-xs font-rubik-medium ${liked ? "text-red-500" : "text-black-300"
                            }`}
                    >
                        Útil
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex flex-row items-center gap-1">
                    <Image source={icons.chat} className="size-4" tintColor="#0061FF" />
                    <Text className="text-xs font-rubik-medium text-black-300">
                        Responder
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Comment;