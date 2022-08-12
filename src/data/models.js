import { Model, ORM} from "redux-orm";
// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
import { fk } from 'redux-orm';

class User extends Model {}
User.modelName = 'User';

class Post extends Model {}
Post.modelName = 'Post';

class Comment extends Model {}
Comment.modelName = 'Comment';

Comment.fields = {
    postId: fk('Post', 'comments'),
};

const orm = new ORM;
orm.register(User, Post, Comment );

// const rootReducer = combineReducers({
//     orm: createReducer(orm), // This will be the Redux-ORM state.
//     // … potentially other reducers
// });
// const store = createStore(rootReducer);

const session = orm.session();

export const getUser = (id) => {
    if(id) {
        const user = session.User.withId(id);
        return user;
    }
    return session.User.all().toModelArray();
}

export const createUser = (props) => {
        session.User.upsert(props);
};

export const getPost = (id) => {
    if(id) {
        const post = session.Post.withId(id);
        return post;
    }
    return session.Post.all().toModelArray();
}

export const createPost = (props) => {
    const writer = getUser(props.userId);
        session.Post.upsert({
            id: props.id,
            postNum : props.postNum,
            writer : writer.name,
            title: props.title,
            complete : props.completed,
            contents: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem\n" +
                "                Ipsum has been the industry's standard dummy text ever since the 1500s, when an\n" +
                "                unknown printer took a galley of type and scrambled it to make a type specimen book.\n" +
                "                It has survived not only five centuries, but also the leap into electronic\n" +
                "                typesetting, remaining essentially unchanged. It was popularised in the 1960s with\n" +
                "                the release of Letraset sheets containing Lorem Ipsum passages, and more recently\n" +
                "                with desktop publishing software like Aldus PageMaker including versions of Lorem\n" +
                "                Ipsum."
        });
}

export const getCommentList = (postId) => {
    if(postId) {
        const commentList = session.Comment.all().filter(comment => comment.postId === postId).toModelArray();
        return commentList;
    }
    return session.Comment.all().toModelArray();
}

export const getComment = (id) => {
    if(id) {
        const comment = session.Comment.withId(id);
        return comment;
    }
    return session.Comment.all().toModelArray();
}

export const createComment = (props) => {
        session.Comment.upsert(props);
}