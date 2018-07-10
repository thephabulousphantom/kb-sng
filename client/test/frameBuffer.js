import * as Test from "./test.js";
import State from "../state/state.js";
import Frame from "../state/frame.js";
import FrameBuffer from "../state/frameBuffer.js";
import ModifyStateCommand from "../command/modifyState.js";

function ModifyStateProcessor(state, command) {

    switch (command.name) {

        case "ModifyState":

            state._set(command.key, command.value);
            break;
    }
};

export default function FrameBufferTest() {

    Test.Run("Past frames update", function() {

        let frameBuffer = new FrameBuffer(3);

        frameBuffer.execute(1, new ModifyStateCommand("x", 1));

        let state = frameBuffer.process(3, ModifyStateProcessor);

        Test.Assert(state._get("x") === 1, "Changes to a past frame must reflect to newer ones.");

        frameBuffer.execute(2, new ModifyStateCommand("x", 2));
        
        state = frameBuffer.process(3, ModifyStateProcessor);

        Test.Assert(state._get("x") === 2, "Changes to a past frame must update newer ones, even if they were processed already.");
        
    });
}