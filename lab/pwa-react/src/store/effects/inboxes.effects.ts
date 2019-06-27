// WORK: remove me.
// import * as fromInboxesAction from "../actions/inbox.action";

// import { ID } from "server/models";
// import { IInbox } from "src/models";
// import ApiService from "../../_shared/services/ApiService";

// export interface IInboxStorageModel {
//   point: {
//     to: ID;
//   };
//   part: {
//     of: ID;
//   };
//   inbox: {};
// }

// export interface IInboxQueryModel extends IInboxStorageModel {
//   id: ID;
// }

// export const inboxToInboxQueryItem = (inbox: IInbox): IInboxQueryModel => ({
//   id: inbox.id,
//   inbox: {},
//   part: {
//     of: inbox.of
//   },
//   point: {
//     to: inbox.to
//   }
// });

// export const inboxStorageItemToInbox = (
//   id: ID,
//   inboxStorageItem: IInboxStorageModel
// ): IInbox => ({
//   id,
//   of: inboxStorageItem.part.of,
//   to: inboxStorageItem.point.to
// });

// export const addInboxes = (inboxes: IInbox[]) => (dispatch: any) => {
//   dispatch({ ...new fromInboxesAction.AddInboxes(inboxes) });

//   return ApiService.create(inboxes.map(inboxToInboxQueryItem))
//     .then(res => {
//       return res.length === inboxes.length
//         ? dispatch({ ...new fromInboxesAction.AddInboxesSuccess(inboxes) })
//         : dispatch({
//             ...new fromInboxesAction.AddInboxesFail(
//               `Something went wrong during adding scopes: ${JSON.stringify(
//                 inboxes
//               )}`
//             )
//           });
//     })
//     .catch(e => dispatch({ ...new fromInboxesAction.AddInboxesFail(e) }));
// };

// export const loadInboxes = () => (dispatch: any) => {
//   dispatch({ ...new fromInboxesAction.LoadInboxes() });

//   return (
//     ApiService.read([{ inbox: {} }])
//       .then(res => {
//         if (res.length) {
//           const firstResult = head(res);
//           return dispatch({
//             ...new fromInboxesAction.LoadInboxesSuccess(
//               Object.keys(firstResult).map(id => {
//                 //   WORK: as any???
//                 return inboxStorageItemToInbox(id, firstResult[id] as any);
//               })
//             )
//           });
//         } else {
//           return dispatch({
//             ...new fromInboxesAction.LoadInboxesFail(
//               `Something went wrong while loading scopes.`
//             )
//           });
//         }
//       })
//       //   WORK: Do not catch so early to allow errors to appear?
//       .catch(e => dispatch({ ...new fromInboxesAction.LoadInboxesFail(e) }))
//   );
// };
