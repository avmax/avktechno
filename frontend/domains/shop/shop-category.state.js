import Vue from 'vue';
import { getCategories, postCategory, putCategory, deleteCategory } from '~/domains/shop/shop.api';

const START_CATEGORY_EDITION = 'начать изменение категрии';
const SAVE_CATEGORY_EDITS = 'сохранить изменения катигории';
const CANCEL_CATEGORY_EDITION = 'прекратить изменение категории';

const GET_CATEGORIES = 'загрузить категории';
const ADD_CATEGORY = 'добавить категорию';
const EDIT_CATEGORY = 'править категорию';
const REMOVE_CATEGORY = 'удалить категорию';

export const categoriesState = {
  categories: [],
};

export const categoriesMutations = {
  [START_CATEGORY_EDITION](state, categoryData) {
    state.entityBeingEditedType = 'category';
    state.entityBeingEditedId = categoryData ? categoryData.id : null;
    state.entityEditionType = categoryData ? 'edit' : 'add';
    categoryData = categoryData || { };

    state.entityBeingEdited = {
      title: {
        label: 'Заголовок',
        value: categoryData.title || null,
        required: true,
        control: 'input',
      },
      description: {
        label: 'Описание',
        value: categoryData.description || null,
        required: true,
        control: 'textfield',
      },
      imgUrl: {
        label: 'URL Картинки',
        value: categoryData.imgUrl || null,
        required: true,
        control: 'input',
      },
    };
  },
  [CANCEL_CATEGORY_EDITION](state) {
    state.entityBeingEdited = null;
    state.entityBeingEditedType = null;
    state.entityEditionType = null;
  },
  [ADD_CATEGORY](state, category) {
    state.categories.push(category);
  },
  [EDIT_CATEGORY](state, categoryData) {
    let index;
    state.categories.forEach((category, i) => {
      if (category.id === categoryData.id) {
        index = i;
      }
    });

    Vue.set(state.categories, index, categoryData);
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
};

export const categoriesActions = {
  [ADD_CATEGORY]({ commit }) {
    commit(START_CATEGORY_EDITION);
  },
  [EDIT_CATEGORY]({ commit }, categoryData) {
    commit(START_CATEGORY_EDITION, categoryData);
  },
  async [SAVE_CATEGORY_EDITS]({ state, commit }, categoryData) {
    const entityEditionType = state.entityEditionType;
    let ACTION;
    let apiMethod;

    if (entityEditionType === 'add') {
      ACTION = ADD_CATEGORY;
      apiMethod = postCategory;
    } else if (entityEditionType === 'edit') {
      ACTION = EDIT_CATEGORY;
      apiMethod = putCategory;

      const entityBeingEditedId = state.entityBeingEditedId;
      let rawCategoryData;

      state.categories.forEach((category) => {
        if (category.id === entityBeingEditedId) {
          rawCategoryData = category;
        }
      });

      categoryData = Object.assign({ }, rawCategoryData, categoryData);
    } else {
      return Promise.reject(new Error(`нельзя сохранить категорию, не определен тип правок, state.entitiyEditionType = ${entityEditionType}`));
    }

    try {
      const res = await apiMethod(categoryData);
      commit(ACTION, res.data);
      commit(CANCEL_CATEGORY_EDITION);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async [REMOVE_CATEGORY]({ commit }, id) {
    try {
      const res = await deleteCategory(id);
      commit(REMOVE_CATEGORY, id);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async [GET_CATEGORIES]({ state, commit }) {
    if (state.categories && state.categories.length > 0) { return Promise.resolve(); }
    try {
      const res = await getCategories()
        .then(({ data }) => data.forEach(category => commit(ADD_CATEGORY, category)));
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  },
};

export {
  SAVE_CATEGORY_EDITS, CANCEL_CATEGORY_EDITION,
  GET_CATEGORIES, ADD_CATEGORY, EDIT_CATEGORY, REMOVE_CATEGORY,
};
