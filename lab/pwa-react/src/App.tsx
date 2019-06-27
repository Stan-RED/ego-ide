import { head } from "lodash";
import * as React from "react";

import Main from "./_core/main/Main";
import Sidebar from "./_core/sidebar/Sidebar";
import ApiService from "./_shared/services/ApiService";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    // WORK: Delme, before that - move to temporary service.
    ApiService.read([{ id: "Stan" }]).then(res => {
      if (!head(res)) {
        ApiService.create([
          {
            id: "Stan",
            person: { firstName: "Stanislav", lastName: "Yarmonov" },
            user: { name: "Stan" }
          },
          {
            id: "Scope1",
            name: {
              name: "Scope1"
            },
            part: {
              of: "Stan"
            },
            scope: {}
          },
          {
            id: "Scope2",
            name: {
              name: "Scope2"
            },
            part: {
              of: "Stan"
            },
            scope: {}
          },
          {
            id: "ScopeAndTopic",
            name: {
              name: "ScopeAndTopic"
            },
            part: {
              of: "Stan"
            },
            scope: {},
            topic: {}
          },
          {
            id: "Topic1",
            name: {
              name: "Topic1"
            },
            part: {
              of: "Scope1"
            },
            topic: {}
          },
          {
            id: "Inbox1",
            inbox: {},
            part: {
              of: "Stan"
            },
            point: {
              to: "Text1"
            }
          },
          {
            id: "Text1",
            part: {
              of: "Stan"
            },
            text: {
              content: "some-text"
            }
          },
          {
            id: "Inbox2",
            inbox: {},
            part: {
              of: "Stan"
            },
            point: {
              to: "File1"
            }
          },
          {
            id: "File1",
            part: {
              of: "Stan"
            },
            raw: "raw-file-content"
          }
        ]).then(x => {
          // tslint:disable-next-line:no-console
          console.log(x);
        });
      }
    });

    //     .then(x => {
    //       // tslint:disable-next-line:no-console
    //       console.log(x);
    //       ApiService.read([{ id: "Stan" }]).then(y => {
    //         // tslint:disable-next-line:no-console
    //         console.log(y);

    //         ApiService
    //           .update([
    //             {
    //               id: "Stan",
    //               person: { firstName: "Stanisl." }
    //             }
    //           ])
    //           .then(z => {
    //             // tslint:disable-next-line:no-console
    //             console.log(z);
    //             ApiService.read([{ id: "Stan" }]).then(y1 => {
    //               // tslint:disable-next-line:no-console
    //               console.log(y1);

    //               ApiService
    //                 .remove([
    //                   {
    //                     id: "Stan"
    //                   }
    //                 ])
    //                 .then(y3 => {
    //                   // tslint:disable-next-line:no-console
    //                   console.log(y3);

    //                   ApiService.read([{ id: "Stan" }]).then(y4 => {
    //                     // tslint:disable-next-line:no-console
    //                     console.log(y4);
    //                   });
    //                 });
    //             });
    //           });
    //       });
    //     });
  }

  render() {
    return (
      <div className="App">
        <Main />
        <Sidebar />
      </div>
    );
  }
}

export default App;
