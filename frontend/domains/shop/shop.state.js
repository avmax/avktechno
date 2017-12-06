import {
  categoriesState, categoriesMutations, categoriesActions,
  SAVE_CATEGORY_EDITS, CANCEL_CATEGORY_EDITION,
  GET_CATEGORIES, ADD_CATEGORY, EDIT_CATEGORY, REMOVE_CATEGORY,
} from './shop-category.state';

const SAVE_ENTITY_EDITS = 'сохранить изменения сущности';
const CANCEL_ENTITY_EDITION = 'прекратить изменение сущности';

const ADD_ENTITY = 'добавить сущность';
const EDIT_ENTITY = 'править сущность';
const REMOVE_ENTITY = 'удалить сущность';
const GET_ENTITIES = 'загрузить сущности';


export const state = () => ({
  entityBeingEdited: null,
  entityBeingEditedId: null,
  entityBeingEditedType: null,
  entityEditionType: null,
  ...categoriesState,
});

export const mutations = {
  [CANCEL_ENTITY_EDITION](state) {
    state.entityBeingEdited = null;
    state.entityBeingEditedType = null;
    state.entityEditionType = null;
  },
  ...categoriesMutations,
};

export const actions = {
  [ADD_ENTITY]({ dispatch }, entityType) {
    let ACTION;

    switch (entityType) {
      case 'category':
        ACTION = ADD_CATEGORY;
        break;
      default:
        break;
    }

    dispatch(ACTION);
  },
  [EDIT_ENTITY]({ dispatch }, { entityType, entityData }) {
    let ACTION;

    switch (entityType) {
      case 'category':
        ACTION = EDIT_CATEGORY;
        break;
      default:
        break;
    }

    dispatch(ACTION, entityData);
  },
  async [REMOVE_ENTITY]({ dispatch }, { entityType, entityId }) {
    let ACTION;

    switch (entityType) {
      case 'category':
        ACTION = REMOVE_CATEGORY;
        break;
      default:
        break;
    }

    try {
      const res = await dispatch(ACTION, entityId);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  [CANCEL_ENTITY_EDITION]({ state, dispatch }) {
    const entityType = state.entityBeingEditedType;
    let ACTION;

    switch (entityType) {
      case 'category':
        ACTION = CANCEL_CATEGORY_EDITION;
        break;
      default:
        break;
    }

    dispatch(ACTION);
  },
  async [SAVE_ENTITY_EDITS]({ state, dispatch }, entityData) {
    const entityType = state.entityBeingEditedType;
    let ACTION;

    switch (entityType) {
      case 'category':
        ACTION = SAVE_CATEGORY_EDITS;
        break;
      default:
        break;
    }

    try {
      const res = await dispatch(ACTION, entityData);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async [GET_ENTITIES]({ dispatch }, { entityType }) {
    let ACTION;

    switch (entityType) {
      case 'category':
        ACTION = GET_CATEGORIES;
        break;
      default:
        break;
    }

    try {
      const res = await dispatch(ACTION);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  ...categoriesActions,
};

export { SAVE_ENTITY_EDITS, CANCEL_ENTITY_EDITION };
export { GET_ENTITIES, ADD_ENTITY, EDIT_ENTITY, REMOVE_ENTITY };

