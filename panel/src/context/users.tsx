import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";

type UsersContextType = {
  data: {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    displayName: string,
    isVerified: boolean,
    isMod: boolean,
    isBanned: boolean,
    displayProfile: boolean,
    progress: {
      lesson: string,
      progressPercent: number,
      questions: {
        question: string,
        givenAnswer: string,
        state: string
      }[]
    }[]
  }[],
  setData: Dispatch<SetStateAction<Array<object>>>;
  columns: {
    [key: string]: any
  }[],
  shownUserProgressColumns: {
    [key: string]: any
  }[]
};

export const UsersContext = createContext<UsersContextType>({
  data: [],
  setData: () => null,
  columns: [],
  shownUserProgressColumns: []
});

type UsersProviderProps = {
  children: ReactNode;
};

export const UsersProvider: FC<UsersProviderProps> = (props) => {
  const { children } = props;

  const [data, setData] = useState([
    {
      id: "987654321987654321987654321987654321987654321987654321987654321987654321",
      firstName: "Oğuzhan",
      lastName: "Koca",
      email: "oguzhankoca@gmail.com",
      displayName: "oguzhan",
      isVerified: true,
      isMod: true,
      isBanned: false,
      displayProfile: true,
      progress: [
        {
          expand: "1",
          lesson: "Lesson 1",
          progressPercent: 50,
          questions: [
            {
              question: "Question 1",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 2",
              givenAnswer: "Answer",
              state: "wrong"
            },
            {
              question: "Question 3",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 4",
              givenAnswer: "Answer",
              state: "empty"
            }
          ]
        },
        {
          expand: "2",
          lesson: "Lesson 2",
          progressPercent: 60,
          questions: [
            {
              question: "Question 1",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 2",
              givenAnswer: "Answer",
              state: "wrong"
            },
            {
              question: "Question 3",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 4",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 5",
              givenAnswer: "Answer",
              state: "empty"
            }
          ]
        }
      ]
    },
    {
      id: "2",
      firstName: "Oğuzhan",
      lastName: "Koca",
      email: "oguzhankoca@gmail.com",
      displayName: "oguzhan",
      isVerified: true,
      isMod: true,
      isBanned: false,
      displayProfile: true,
      progress: [
        {
          expand: "1",
          lesson: "Lesson 1",
          progressPercent: 40,
          questions: [
            {
              question: "Question 1",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 2",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 3",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 4",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 5",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 1",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 2",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 3",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 4",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 5",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 1",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 2",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 3",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 4",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 5",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 1",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 2",
              givenAnswer: "Answer",
              state: "correct"
            },
            {
              question: "Question 3",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 4",
              givenAnswer: "Answer",
              state: "empty"
            },
            {
              question: "Question 5",
              givenAnswer: "Answer",
              state: "empty"
            }
          ]
        }
      ]
    },
  ]);

  const [columns] = useState([
    { id: "id", name: "Id", width: 80 },
    { id: "firstName", name: "Ad", width: 100 },
    { id: "lastName", name: "Soyad", width: 100 },
    { id: "email", name: "Email", width: 200, flexGrow: 1 },
    { id: "displayName", name: "Kullanıcı Adı", width: 120 },
    { id: "isVerified", name: "Doğrulandı", width: 100 },
    { id: "isMod", name: "Moderatör", width: 100 },
    { id: "isBanned", name: "Banlı", width: 100 },
    { id: "displayProfile", name: "Profili Göster", width: 120 },
    { id: "actions", name: "İşlemler", width: 80, fixed: "right" }
  ]);
  
  const [shownUserProgressColumns] = useState([
    { id: "expand", name: "", width: 36 },
    { id: "lesson", name: "Ders Adı", flexGrow: 1 },
    { id: "progressPercent", name: "İlerleme", fixed: "right", width: 180 }
  ]);

  const value: any = useMemo(
    () => ({
      data,
      setData,
      shownUserProgressColumns,
      columns
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
