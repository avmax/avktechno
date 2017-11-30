import { getCategories } from '~/domains/shop/shop.api';

const LOAD_CATEGORIES = 'загрузить категории';
const CREATE_CATEGORY = 'создать категорию';
const ADD_CATEGORY = 'добавить категорию';
const REMOVE_CATEGORY = 'удалить категорию';
const CANCEL_EDITION = 'прекратить изменение сущности';


export const state = () => ({
  entityBeingEdited: null,
  categories: [],
});

export const mutations = {
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
};

export const actions = {
  [LOAD_CATEGORIES]({ state, commit }) {
    if (state.categories && state.categories.length > 0) { return Promise.resolve(); }
    return getCategories()
      .then(({ data }) => data.forEach(category => commit(ADD_CATEGORY, category)))
      .catch(err => console.error(err.response.data));
  },
};


export { LOAD_CATEGORIES, ADD_CATEGORY, CREATE_CATEGORY, CANCEL_EDITION, REMOVE_CATEGORY };
