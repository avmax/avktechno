const GET_CATEGORIES = 'получить категории';
const CREATE_CATEGORY = 'создать категорию';
const ADD_CATEGORY = 'добавить категорию';
const REMOVE_CATEGORY = 'удалить категорию';
const CANCEL_EDITION = 'прекратить изменение сущности';


const shopState = {
  state: {
    entityBeingEdited: null,
    categories: [],
  },
  mutations: {
    [ADD_CATEGORY](state, category) {
      state.entityBeingEdited = null;
      state.categories.push(category);
    },
    [CREATE_CATEGORY](state) {
      state.entityBeingEdited = {
        title: {
          label: 'Заголовок',
          value: null,
          required: true,
          control: 'input',
        },
        description: {
          label: 'Текст',
          value: null,
          required: true,
          control: 'textfield',
        },
        imgUrl: {
          label: 'URL Картинки',
          value: null,
          required: true,
          control: 'input',
        },
      };
    },
    [REMOVE_CATEGORY](state, categoryId) {
      let index;
      state.categories.forEach((category, i) => {
        if (category.id === categoryId) {
          index = i;
        }
      });
      state.categories.splice(index, 1);
    },
    [CANCEL_EDITION](state) {
      state.entityBeingEdited = null;
    },
  },
};


export default shopState;
export { GET_CATEGORIES, ADD_CATEGORY, CREATE_CATEGORY, CANCEL_EDITION, REMOVE_CATEGORY };
