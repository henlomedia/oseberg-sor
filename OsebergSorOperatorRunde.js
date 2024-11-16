const OsebergSorOperatorRunde = () => {
  const { useState } = React;

  const Button = ({ children, onClick, className }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded ${className}`}>{children}</button>
  );

  const Checkbox = ({ id, checked, onCheckedChange }) => (
    <input type="checkbox" id={id} checked={checked} onChange={onCheckedChange} />
  );

  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedArea, setSelectedArea] = useState(null);
  const [tasks, setTasks] = useState({
    P23: {
      'Test Separator': [
        { id: 1, description: 'Sjekk olje og vann nivå', completed: false },
        { id: 2, description: 'Sjekk funksjonalitet på seglass ved behov', completed: false },
      ],
      'Hydrophoretanker': [
        { id: 1, description: 'Sjekk nivå', completed: false },
      ],
      'Gasskjølere': [
        { id: 1, description: 'Sjekk posisjon på TVer. Reguler bypass ved behov', completed: false },
        { id: 2, description: 'Sjekk avleiringshemmer mengde (natt)', completed: false },
      ],
      'Kjemikaliepumper/Tanker': [
        { id: 1, description: 'Sjekk kjemikaliepumper for normal trykk og lyd. Pumper skal ikke "banke" mot intern sikkerhetsventil.', completed: false },
        { id: 2, description: 'Sjekk nivå i kjemikalietanker', completed: false },
      ],
    },
    P22: {
      'Rundown tanker': [
        { id: 1, description: 'Sjekk nivå og overløp', completed: false },
      ],
      'Utsira tank': [
        { id: 1, description: 'Sjekk nivå', completed: false },
        { id: 2, description: 'Sjekk funksjonalitet seglass ved behov', completed: false },
      ],
      'Dollinger': [
        { id: 1, description: 'Sjekk dP filter', completed: false },
        { id: 2, description: 'Sjekk vakuum', completed: false },
      ],
      'Emulsjonsbryter Subsea': [
        { id: 1, description: 'Sjekk mengde', completed: false },
      ],
      'EV blowdown M': [
        { id: 1, description: 'Akkumulator nivåer og trykk', completed: false },
      ],
    },
 P21: {
      '1/2 trinn kompressor': [
        { id: 1, description: 'Syntetisk oljenivå', completed: false },
        { id: 2, description: 'Lekkasjer i turbinhood (Se fra vindu)', completed: false },
        { id: 3, description: 'dP/flow tettninger. Sjekk for lekkasjer i tettning/gass-skap', completed: false },
        { id: 4, description: 'Nivå scrubberer', completed: false },
      ],
      '3-trinn kompressor': [
        { id: 1, description: 'Sjekk dP/flow på tetninger', completed: false },
        { id: 2, description: 'Generell sjekk i tetning/gass-skap', completed: false },
        { id: 3, description: 'Sjekk smøreolje på el-motor', completed: false },
        { id: 4, description: 'Sjekk nivå på scrubber', completed: false },
      ],
      'Fakkelgasskompressor': [
        { id: 1, description: 'Sjekk oljenivå', completed: false },
        { id: 2, description: 'Sjekk for lekkasjer gjennom vindu', completed: false },
      ],
      'Produksjonsseparator': [
        { id: 1, description: 'Sjekk olje og vann-nivå', completed: false },
        { id: 2, description: 'Sjekk funksjonalitet seglass ved behov', completed: false },
      ],
    },
 C22: {
      'Rundown tanker Hovedkraft A/B': [
        { id: 1, description: 'Sjekk nivå', completed: false },
      ],
      'Starthydraulikk': [
        { id: 1, description: 'Sjekk nivå og generell sjekk', completed: false },
      ],
      'Hovedkraft A/B': [
        { id: 1, description: 'Lekkasjer under skjørt', completed: false },
        { id: 2, description: 'Syntetisk og mineralsk oljenivå', completed: false },
        { id: 3, description: 'Nivå rundown tanker generator', completed: false },
        { id: 3, description: 'Lekkasjer i turbinhood(se fra vindu)', completed: false },
      ],
      'Hydrophoretank': [
        { id: 1, description: 'Sjekk nivå, sjekk også tank på D24', completed: false },
      ],
    },
  });

  const areasOppe = ['P23', 'P22', 'P21', 'C22', 'C21', 'Mob båt dekk', 'W21', 'P21 Mess', 'P23 Mess', 'Boligkvarter'];
  const areasNede = ['P12', 'P11', 'W13', 'W12', 'W11', 'Z10', 'C12', 'C11'];

  const selectArea = (area) => {
    setSelectedArea(area);
    setCurrentScreen('tasks');
  };

  const toggleTask = (area, category, id) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [area]: {
        ...prevTasks[area],
        [category]: prevTasks[area][category].map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ),
      },
    }));
  };

  const resetTasks = (area) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [area]: Object.fromEntries(
        Object.entries(prevTasks[area]).map(([category, categoryTasks]) => [
          category,
          categoryTasks.map(task => ({ ...task, completed: false }))
        ])
      ),
    }));
  };

  const resetAllTasks = () => {
    setTasks(prevTasks => {
      const resetTasks = {};
      for (const area in prevTasks) {
        resetTasks[area] = Object.fromEntries(
          Object.entries(prevTasks[area]).map(([category, categoryTasks]) => [
            category,
            categoryTasks.map(task => ({ ...task, completed: false }))
          ])
        );
      }
      return resetTasks;
    });
  };

  const AreaButtons = ({ areas, color }) => (
    <div className="grid grid-cols-2 gap-2">
      {areas.map((area) => (
        <Button 
          key={area} 
          onClick={() => selectArea(area)} 
          className={`w-full ${
            color === 'blue' 
              ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' 
              : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
          } text-white`}
        >
          {area}
        </Button>
      ))}
    </div>
  );

  const WelcomeScreen = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Oseberg Sør</h1>
      <div className="p-4 bg-blue-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">Operatørrunde Oppe</h2>
        <AreaButtons areas={areasOppe} color="blue" />
      </div>
      <div className="p-4 bg-green-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-green-800">Operatørrunde Nede</h2>
        <AreaButtons areas={areasNede} color="green" />
      </div>
      <Button 
        onClick={resetAllTasks} 
        className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white"
      >
        Tilbakestill alle oppgaver
      </Button>
    </div>
  );

  const TaskScreen = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <Button onClick={() => setCurrentScreen('welcome')} className="bg-gray-200 hover:bg-gray-300 text-black">
          Tilbake
        </Button>
        <h2 className="text-xl font-semibold">Oppgaver for {selectedArea}</h2>
      </div>
      {tasks[selectedArea] ? (
        Object.entries(tasks[selectedArea]).map(([category, categoryTasks]) => (
          <div key={category} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{category}</h3>
            {categoryTasks.map(task => (
              <div key={task.id} className="flex items-center space-x-2 mb-1">
                <Checkbox
                  id={`task-${selectedArea}-${category}-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(selectedArea, category, task.id)}
                />
                <label
                  htmlFor={`task-${selectedArea}-${category}-${task.id}`}
                  className={`${task.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {task.description}
                </label>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Ingen oppgaver definert for dette området ennå.</p>
      )}
      <Button 
        onClick={() => resetTasks(selectedArea)} 
        className="w-full bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white"
      >
        Tilbakestill oppgaver for {selectedArea}
      </Button>
    </div>
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      {currentScreen === 'welcome' ? <WelcomeScreen /> : <TaskScreen />}
    </div>
  );
};
