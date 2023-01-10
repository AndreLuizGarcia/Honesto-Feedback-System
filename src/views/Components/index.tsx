import Button from '../../components/Button'
import MainLayout from '../../layouts/MainLayout'
import Spinner from '../../components/Spinner'
import User from '../../components/User'
import Progress from '../../components/Progress'
import TextArea from '../../components/TextArea'
import Scale from '../../components/Scale'
import MultipleChoice from '../../components/MultipleChoice'
import NoFeedback from '../../components/NoFeedback'

const questions = [
  {
    value: 1,
    label: `Please Improve
      You may have done one or the following: Maybe you were mostly quiet in meetings and when you had something on your mind, you brought it to the team afterward. Or, you had feedback that would be valuable to go, but you found it too difficult. Or, you had an opportunity to grow by doing something uncomfortable but you didn’t. `,
  },
  {
    value: 2,
    label: `You Were Good
    You sometimes participate in meetings but you feel that they don’t always bring up important things when they should. `,
  },
  {
    value: 3,
    label: `You Were Great  
      I and others can count on your courage to help the team do what is right. `,
  },
]

const Components = () => (
  <MainLayout loggedIn>
    <h1>heading 1</h1>
    <h2>heading 2</h2>
    <h3>heading 3</h3>
    <p>
      {/* eslint-disable-next-line */}
      Lorem ipsum dolor sit <a>amet consectetur adipisicing elit</a>. Excepturi
      aspernatur, sapiente corrupti obcaecati consequuntur corporis tempora
      deserunt quis labore eos sequi adipisci quas totam ad voluptate molestiae
      unde.
    </p>

    <Button
      onClick={() => {
        console.log('click')
      }}
    >
      Primary button
    </Button>

    <Button
      onClick={() => {
        console.log('click')
      }}
      disabled
    >
      Primary button disabled
    </Button>

    <Button
      secondary
      onClick={() => {
        console.log('click')
      }}
    >
      Secondary button
    </Button>
    <br />
    <Spinner />
    <div />
    <User name="John David" />
    <User name="John David" avatarUrl="https://i.pravatar.cc/150?img=68" />
    <Progress
      labelText="QUESTIONS COMPLETED"
      completedItems={3}
      totalItems={9}
    />
    <TextArea />
    <MultipleChoice options={questions} />
    <div style={{ height: '74px' }}>
      <Scale name="Component page" initialValue={0} />
    </div>
    <NoFeedback />
  </MainLayout>
)

export default Components
