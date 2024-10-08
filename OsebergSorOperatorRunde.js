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
        { id: 1, description: 'Sjekk olje/vann nivå', completed: false },
        { id: 2, description: 'Sjekk funksjonalitet seglass', completed: false },
      ],
      'Hydrophoretanker': [
        { id: 1, description: 'Sjekk nivå', completed: false },
      ],
      'Gasskjølere': [
        { id: 1, description: 'Sjekk TVer for regulering', completed: false },
        { id: 2, description: 'Sjekk avl.hemmer mengde (natt)', completed: false },
      ],
      'Kjemikalier': [
        { id: 1, description: 'Sjekk kjemikaliepumper for normal trykk og lyd', completed: false },
        { id: 2, description: 'Sjekk nivå i kjemikalietanker', completed: false },
      ],
    },
    P22: {
      'Tanker': [
        { id: 1, description: 'Sjekk RunDown tanker for nivå/overløp', completed: false },
        { id: 2, description: 'Sjekk Utsira tank for nivå og funksjonalitet seglass', completed: false },
      ],
      'Utstyr': [
        { id: 1, description: 'Sjekk Dollinger for dP filter og vakum', completed: false },
        { id: 2, description: 'Sjekk Em.bryter subsea for mengde', completed: false },
        { id: 3, description: 'Sjekk EV blowdown M for akkumulator nivåer', completed: false },
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
