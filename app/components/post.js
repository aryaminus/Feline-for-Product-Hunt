import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import User from "@component/user";
import {GREY, GREY_DARK, GREY_LIGHT} from "@theme/light";
import {NavigationActions} from "react-navigation"
import Icon from "react-native-vector-icons/FontAwesome";
import analytics from "@store/analytics";
import theme from "@store/theme"

/**
 * Post component for rendering category and topic list view
 */
class Post extends Component {

    constructor() {
        super();
    }

    openPost(post) {
        analytics.logEvent("View Post");
        const navigateAction = NavigationActions.navigate({
            routeName: "Post",
            params: {
                id: post.id
            }
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        let {post} = this.props;
        return (
            <TouchableOpacity onPress={() => {
                this.openPost(post)
            }}>
                <View style={[styles.mainContainer, {borderBottomColor: theme.colors.INACTIVE_TINT_COLOR}]}>

                    <View style={styles.container}>
                        <Image
                            style={styles.image}
                            source={{
                                uri: post.thumbnail.image_url,
                            }}
                        />
                        <View style={[{flex: 1}, styles.rightContainer]}>
                            <Text style={[styles.name, {color: theme.colors.MAIN_TEXT}]} ellipsizeMode="tail" numberOfLines={1}>{post.name}</Text>
                            <Text style={[styles.tagline, {color: theme.colors.MAIN_TEXT}]} ellipsizeMode="tail" numberOfLines={2}>{post.tagline}</Text>
                        </View>
                    </View>

                    <View style={styles.container}>
                        <View style={[styles.box, {borderColor: theme.colors.BUTTON_TEXT}]}>
                            <View style={styles.rowContainer}>
                                <Icon style={{
                                    marginRight: 5,
                                    marginTop: 1
                                }} name="caret-up" size={15} color={theme.colors.BUTTON_TEXT}/>
                                <Text style={[styles.votes, {color: theme.colors.BUTTON_TEXT}]}>{post.votes_count}</Text>
                            </View>
                        </View>

                        <View style={[styles.rightContainer]}>
                            <View style={[styles.box, {borderColor: theme.colors.BUTTON_TEXT}]}>
                                <View style={styles.rowContainer}>
                                    <Icon style={{marginRight: 5, marginTop: 3}} name="comment" size={10} color={theme.colors.BUTTON_TEXT}/>
                                    <Text style={[styles.comments, {color: theme.colors.BUTTON_TEXT}]}>{post.comments_count}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{marginTop: 13, marginLeft: 10}}>
                            <User user={post.user} navigation={this.props.navigation}/>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    mainContainer: {
        padding: 10,
        borderBottomWidth: 1
    },
    votes: {
        color: "black",
        fontWeight: "bold",
        fontSize: 13
    },
    comments: {
        color: GREY,
        fontWeight: "bold",
        fontSize: 13
    },
    box: {
        height: 40,
        width: 75,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 5,
        borderColor: GREY_LIGHT,
        borderWidth: 1
    },
    rowContainer: {
        flexDirection: "row",
    },
    rightContainer: {
        paddingLeft: 10
    },
    image: {
        borderRadius: 5,
        width: 75,
        height: 75
    },
    makerImage: {
        width: 35,
        height: 35,
        borderRadius: 50
    },
    name: {
        fontSize: 17,
        fontFamily: "SFBold",
    },
    stats: {
        marginTop: 10,
        fontSize: 13,
        fontFamily: "SFRegular"
    },
    tagline: {
        marginTop: 5,
        fontSize: 13,
        fontFamily: "SFRegular"
    },
    votesButton: {
        width: 75
    }
});

export default Post;