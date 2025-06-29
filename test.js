// Intantiate Controller
const PLC = new Controller();

// Subscribe to Tags
PLC.subscribe(new Tag("TEST_TAG"));
PLC.subscribe(new Tag("TEST", "Prog"));
PLC.subscribe(new Tag("TEST_REAL", "Prog"));
PLC.subscribe(new Tag("TEST_BOOL", "Prog"));

// Connect to PLC at IP, SLOT
PLC.connect("192.168.2.23", 5).then(() => {
    const { name } = PLC.properties;

    // Log Connected to Console
    console.log(`\n\nConnected to PLC ${name}...\n`);

    // Begin Scanning Subscription Group
    PLC.scan();
});

// Initialize Event Handlers
PLC.forEach(tag => {
    tag.on("Changed", (tag, lastValue) => {
        console.log(`${tag.name} changed from ${lastValue} -> ${tag.value}`);
    });
})