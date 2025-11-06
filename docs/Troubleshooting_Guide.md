# Troubleshooting Guide
*Solving common problems in the AI Robotics Curriculum*

## Overview

This guide helps students and instructors systematically identify, diagnose, and solve common problems encountered throughout the 40-week AI Robotics curriculum. The troubleshooting approach emphasizes logical thinking, systematic problem-solving, and learning from mistakes.

## Troubleshooting Philosophy

- **Systematic Approach**: Follow logical steps to identify problems
- **Learning Opportunity**: Every problem is a chance to learn something new
- **Document Everything**: Keep track of problems and solutions for future reference
- **Ask for Help**: Collaboration is part of the learning process
- **Stay Calm**: Frustration is normal, but problems are always solvable

---

## General Troubleshooting Methodology

### **The S.T.E.P. Method**
**S**top: Pause and don't panic
**T**hink: Analyze the situation systematically
**E**xperiment: Try potential solutions one at a time
**P**ersist: Keep trying different approaches

### **Basic Troubleshooting Steps**
1. **Identify the Problem**: What exactly isn't working?
2. **Gather Information**: What are the symptoms? When did it start?
3. **Form Hypotheses**: What could be causing this problem?
4. **Test Hypotheses**: Try solutions one at a time
5. **Verify Solution**: Confirm the problem is actually fixed
6. **Document and Learn**: Record what happened for future reference

### **Questions to Ask Yourself**
- What changed right before the problem started?
- Have I seen this problem before?
- What are all the possible causes?
- What's the simplest thing that could be wrong?
- How can I test each possible cause?

---

## Phase 1: Digital Foundations (Weeks 1-8)

### **Computer and Software Issues**

#### **Problem: Computer Won't Turn On**
**Possible Causes:**
- Power cord not connected
- Power outlet not working
- Computer battery dead (laptop)
- Hardware failure

**Troubleshooting Steps:**
1. Check power cable connections at both ends
2. Try a different power outlet
3. If laptop, try with power adapter connected
4. Check for indicator lights
5. If still not working, seek technical support

**Prevention:**
- Always shut down properly
- Keep power connections secure
- Don't let laptop battery completely drain

#### **Problem: Python Program Won't Run**
**Possible Causes:**
- Syntax error in code
- Incorrect Python version
- Missing libraries/modules
- File not saved properly

**Troubleshooting Steps:**
1. **Check Syntax Errors:**
   - Look for red underlines or error highlighting
   - Check for missing colons, parentheses, quotes
   - Verify indentation is correct (Python uses spaces/tabs)

2. **Read Error Messages:**
   - Error message tells you the problem
   - Note the line number mentioned
   - Look up unfamiliar error terms

3. **Verify Python Environment:**
   - Make sure you're using the correct Python version
   - Check that required libraries are installed
   - Try running a simple "Hello World" program

4. **Check File Issues:**
   - Make sure file is saved with .py extension
   - Check file location and permissions
   - Try creating a new file and copying code over

**Common Python Errors and Solutions:**

```
Error: SyntaxError: invalid syntax
Cause: Missing punctuation, incorrect indentation
Solution: Check for missing colons, parentheses, proper indentation

Error: NameError: name 'variable' is not defined
Cause: Variable used before being assigned a value
Solution: Define variable before using it, check spelling

Error: TypeError: can only concatenate str (not "int") to str
Cause: Trying to combine different data types
Solution: Convert types: str(variable) or int(variable)

Error: IndentationError: expected an indented block
Cause: Incorrect indentation (Python uses spaces for structure)
Solution: Use consistent indentation (4 spaces recommended)

Error: ModuleNotFoundError: No module named 'library'
Cause: Required library not installed
Solution: Install library: pip install library_name
```

#### **Problem: Scratch Project Not Working**
**Possible Causes:**
- Blocks not connected properly
- Incorrect variable usage
- Timing issues with events
- Browser compatibility problems

**Troubleshooting Steps:**
1. **Check Block Connections:**
   - Make sure blocks snap together properly
   - Look for gaps between blocks
   - Check that control blocks contain other blocks

2. **Verify Variables:**
   - Make sure variables are created before use
   - Check variable spelling
   - Verify variable scope (for all sprites vs. this sprite only)

3. **Check Event Timing:**
   - Make sure broadcast/receive blocks match
   - Check wait blocks for proper timing
   - Verify when events should trigger

4. **Browser Issues:**
   - Try refreshing the page
   - Clear browser cache
   - Try a different browser
   - Check internet connection

#### **Problem: Programs Run Slowly or Freeze**
**Possible Causes:**
- Infinite loops
- Too many calculations at once
- Computer memory issues
- Browser performance problems

**Troubleshooting Steps:**
1. **Check for Infinite Loops:**
   - Look for loops that never end
   - Add break conditions or counters
   - Use print statements to track loop progress

2. **Optimize Code:**
   - Remove unnecessary calculations
   - Use efficient algorithms
   - Break large tasks into smaller steps

3. **Computer Issues:**
   - Close other programs
   - Restart computer
   - Check available memory
   - Clear temporary files

---

## Phase 2: Electronics and Robotics (Weeks 9-16)

### **Circuit and Electronics Issues**

#### **Problem: LED Won't Light Up**
**Possible Causes:**
- LED connected backward (wrong polarity)
- Resistor value too high
- No power or bad connections
- LED is damaged

**Troubleshooting Steps:**
1. **Check LED Polarity:**
   - LED longer leg = positive (+)
   - LED shorter leg = negative (-)
   - Flat side on LED case = negative (-)
   - Try reversing LED connections

2. **Check Resistor:**
   - Verify resistor value is correct (220-330Ω typical)
   - Check resistor color code or use multimeter
   - Try a lower resistance value

3. **Check Power and Connections:**
   - Verify power source is working
   - Check all wire connections
   - Use multimeter to test voltage
   - Try a different LED

4. **Test LED Separately:**
   - Connect LED directly to power with correct resistor
   - If it lights, problem is in circuit
   - If it doesn't light, LED may be damaged

**Prevention:**
- Always check LED polarity before connecting
- Use appropriate resistor values
- Test components individually before building circuits

#### **Problem: Sensor Not Reading Correctly**
**Possible Causes:**
- Incorrect wiring
- Power supply issues
- Code problems
- Sensor damage
- Environmental factors

**Troubleshooting Steps:**
1. **Check Wiring:**
   - Verify all connections are secure
   - Check pin assignments (VCC, GND, signal)
   - Use wiring diagram for reference
   - Look for loose or broken wires

2. **Test Power Supply:**
   - Use multimeter to check voltage at sensor
   - Verify sensor is getting correct voltage
   - Check power supply is working

3. **Debug Code:**
   - Check pin numbers in code match wiring
   - Verify sensor library is installed and imported
   - Add print statements to see what sensor is reading
   - Test with minimal code example

4. **Environmental Factors:**
   - Light sensor: Check lighting conditions
   - Temperature sensor: Ensure proper contact
   - Distance sensor: Check for obstacles
   - Remove sources of interference

**Sensor-Specific Issues:**

**Light Sensor (Photoresistor):**
- Ensure proper connection with pull-up resistor
- Test in different lighting conditions
- Check for loose connections

**Temperature Sensor (DS18B20):**
- Verify correct pin connections
- Check if sensor requires pull-up resistor
- Ensure library is correctly installed

**Ultrasonic Sensor (HC-SR04):**
- Check trig and echo pin assignments
- Verify 5V power supply
- Test timing in code (pulse duration)
- Check for obstacles in detection path

#### **Problem: Motor Not Working**
**Possible Causes:**
- Insufficient power
- Incorrect wiring
- Code issues
- Motor driver problems
- Mechanical issues

**Troubleshooting Steps:**
1. **Check Power Supply:**
   - Verify motor is getting enough voltage/current
   - Check battery charge
   - Use multimeter to test voltage at motor terminals
   - Try a different power source

2. **Verify Wiring:**
   - Check motor driver connections
   - Verify motor polarity
   - Ensure all connections are secure
   - Look for short circuits

3. **Debug Code:**
   - Check pin assignments in code
   - Verify motor control logic
   - Add debugging output to track motor commands
   - Test with simple motor control code

4. **Test Motor Directly:**
   - Connect motor directly to power source
   - If motor works, problem is in control circuitry
   - If motor doesn't work, motor may be damaged

5. **Check Mechanical Issues:**
   - Verify motor can turn freely (disconnect from load)
   - Check for obstructions
   - Ensure motor mount is secure
   - Look for signs of damage or wear

---

## Phase 3: AI Concepts and Tools (Weeks 17-28)

### **AI Tool Issues**

#### **Problem: AI Tool Not Responding or Giving Poor Results**
**Possible Causes:**
- Vague or unclear prompts
- Tool server issues
- Network connectivity problems
- Inappropriate requests

**Troubleshooting Steps:**
1. **Improve Your Prompt:**
   - Be more specific and detailed
   - Provide context and background
   - Use the PERFECT prompt framework
   - Give examples of desired output

2. **Check Technical Issues:**
   - Verify internet connection
   - Try refreshing the page
   - Clear browser cache and cookies
   - Try a different browser

3. **Tool-Specific Issues:**
   - Check if tool is experiencing outages
   - Verify you have a stable account
   - Check usage limits or quotas
   - Try the tool later if servers are busy

4. **Refine Your Approach:**
   - Break complex requests into smaller parts
   - Ask for explanations instead of just solutions
   - Use different AI tools for comparison
   - Provide more context about your skill level

**Better Prompting Examples:**

**Instead of:** "Make my code work"
**Try:** "I'm building a LED control program for Raspberry Pi. My LED won't turn on. Here's my code: [paste code]. Can you help me identify what's wrong and explain it in simple terms for a beginner?"

**Instead of:** "Explain AI"
**Try:** "Can you explain machine learning to a 15-year-old who is just starting to learn about programming? Use a real-world example that would be familiar to a teenager."

#### **Problem: Computer Vision Not Working**
**Possible Causes:**
- Camera not connected or recognized
- Incorrect camera settings
- Library installation issues
- Code problems
- Lighting or environmental issues

**Troubleshooting Steps:**
1. **Check Camera Hardware:**
   - Verify camera is properly connected
   - Test camera with other software
   - Check cable connections
   - Try a different USB port or camera

2. **Software Issues:**
   - Verify camera drivers are installed
   - Check if camera is recognized by system
   - Restart computer and camera
   - Try different camera software

3. **Library Problems:**
   - Verify computer vision libraries are installed
   - Check library versions are compatible
   - Try importing library in simple test script
   - Reinstall libraries if necessary

4. **Code Debugging:**
   - Check camera initialization code
   - Verify correct camera index (usually 0 or 1)
   - Add error handling and debugging output
   - Test with minimal camera capture code

5. **Environmental Factors:**
   - Improve lighting conditions
   - Check for camera obstructions
   - Adjust camera focus and settings
   - Minimize background motion

#### **Problem: Voice Recognition Not Working**
**Possible Causes:**
- Microphone not connected or recognized
- Incorrect audio settings
- Library installation issues
- Background noise
- Code problems

**Troubleshooting Steps:**
1. **Check Microphone Hardware:**
   - Verify microphone is connected
   - Test microphone with system audio recorder
   - Check microphone permissions
   - Try a different microphone

2. **Audio Settings:**
   - Check system audio input settings
   - Verify correct microphone is selected
   - Adjust microphone input volume
   - Check mute settings

3. **Library Issues:**
   - Verify speech recognition libraries are installed
   - Check library compatibility
   - Test with simple speech recognition example
   - Update libraries if needed

4. **Environment:**
   - Reduce background noise
   - Speak clearly and at appropriate volume
   - Minimize echo and reverberation
   - Use quiet environment for testing

5. **Code Debugging:**
   - Check microphone initialization code
   - Add audio level monitoring
   - Test with different recognition settings
   - Add error handling for audio issues

---

## Phase 4: Integrated Projects (Weeks 29-40)

### **System Integration Issues**

#### **Problem: Multiple Components Not Working Together**
**Possible Causes:**
- Power supply insufficient
- Pin conflicts
- Timing issues
- Software conflicts
- Interference between components

**Troubleshooting Steps:**
1. **Isolate Components:**
   - Test each component individually
   - Identify which component is causing problems
   - Build up system gradually, adding one component at a time
   - Document when problems start occurring

2. **Check Power Supply:**
   - Verify power supply can handle all components
   - Check current draw of each component
   - Look for voltage drops under load
   - Consider separate power supplies if needed

3. **Resolve Pin Conflicts:**
   - Check if multiple components use same pins
   - Verify pin assignments in code
   - Use pin mapping diagrams
   - Consider using I/O expander if needed

4. **Debug Timing Issues:**
   - Add delays between operations
   - Check for blocking operations
   - Use non-blocking code where possible
   - Optimize code execution time

5. **Check Software Conflicts:**
   - Look for library conflicts
   - Check for shared resources
   - Verify code structure and organization
   - Test minimal integration examples

#### **Problem: AI Performance is Poor**
**Possible Causes:**
- Insufficient computing power
- Poor training data
- Incorrect model parameters
- Environmental factors
- Code optimization issues

**Troubleshooting Steps:**
1. **Check Hardware Performance:**
   - Monitor CPU and memory usage
   - Check if hardware meets requirements
   - Close unnecessary programs
   - Consider optimizing model size

2. **Improve Training Data:**
   - Collect more diverse training data
   - Improve data quality and labeling
   - Balance dataset across classes
   - Augment data to increase variety

3. **Optimize Model Parameters:**
   - Adjust learning rate and batch size
   - Try different model architectures
   - Fine-tune hyperparameters
   - Consider pre-trained models

4. **Environmental Optimization:**
   - Improve lighting for vision tasks
   - Reduce background noise for audio tasks
   - Minimize environmental variability
   - Use consistent testing conditions

5. **Code Optimization:**
   - Profile code to find bottlenecks
   - Optimize data processing pipelines
   - Use efficient libraries and frameworks
   - Consider parallel processing

---

## Debugging Tools and Techniques

### **Hardware Debugging Tools**

#### **Multimeter Usage**
- **Voltage Measurement**: Check power at different points
- **Continuity Test**: Verify connections are complete
- **Resistance Measurement**: Check component values
- **Current Measurement**: Monitor power consumption

#### **Software Debugging Tools**

#### **Print Statement Debugging**
```python
print("Debug: Variable value =", variable)
print("Debug: Reached this point in code")
print("Debug: Sensor reading =", sensor_value)
```

#### **LED Indicators**
- Use LEDs to indicate program status
- Blink codes for different error conditions
- Visual confirmation of program flow

#### **Serial Monitor**
- Print debugging information to computer
- Monitor sensor values in real-time
- Track program execution

### **Systematic Debugging Process**

#### **Divide and Conquer**
1. **Isolate the Problem**: Test components individually
2. **Binary Search**: Test half the system, then half of that
3. **Change One Thing**: Only change one variable at a time
4. **Document Everything**: Keep track of what you've tried

#### **Scientific Method**
1. **Observation**: What exactly is happening?
2. **Hypothesis**: What do you think is causing it?
3. **Experiment**: Test your hypothesis
4. **Analysis**: Did the experiment confirm or deny your hypothesis?
5. **Iteration**: Form new hypothesis and repeat

---

## When to Ask for Help

### **Signs You Need Help**
- You've tried the same solution multiple times without success
- You're feeling frustrated or stuck
- The problem involves equipment damage or safety concerns
- You've spent more than 15-30 minutes on a single problem
- You don't understand the error messages or symptoms

### **How to Ask for Help Effectively**
1. **Describe the Problem Clearly**: What exactly isn't working?
2. **Show Your Work**: Share your code, wiring diagrams, what you've tried
3. **Include Error Messages**: Copy and paste complete error messages
4. **Explain What You Expected**: What should happen vs. what is happening
5. **Mention What You've Tried**: List troubleshooting steps you've already taken

### **Good Help-Seeking Examples**

**Instead of:** "My code doesn't work"
**Try:** "I'm trying to make an LED blink using a Raspberry Pi. The LED won't turn on. Here's my code: [paste code]. I've checked the wiring and the LED works when I connect it directly to power. The error message I get is [paste error]."

**Instead of:** "My sensor is broken"
**Try:** "I'm using an HC-SR04 ultrasonic sensor with my Raspberry Pi. I'm getting distance readings of 0cm no matter what's in front of it. I've checked the wiring against the datasheet and tried a different sensor with the same result. Here's my code: [paste code]."

---

## Learning from Problems

### **Problem Journal Template**
```
Date: _______________
Problem Description: ________________________________________
What I Tried: _____________________________________________
What Worked: ______________________________________________
What I Learned: ____________________________________________
How to Prevent This in the Future: __________________________
```

### **Common Problem Categories**
1. **Connection Issues**: Loose wires, bad solder joints, incorrect pin assignments
2. **Power Problems**: Insufficient voltage, current limitations, battery issues
3. **Code Bugs**: Syntax errors, logic errors, incorrect library usage
4. **Component Failure**: Damaged components, manufacturing defects
5. **Environmental Factors**: Lighting, noise, temperature, interference

### **Building Troubleshooting Skills**
- **Practice Regularly**: The more problems you solve, the better you get
- **Document Solutions**: Keep a record of problems and solutions
- **Learn from Others**: Watch how experienced people troubleshoot
- **Stay Calm**: Panic makes problem-solving harder
- **Be Methodical**: Follow a consistent troubleshooting process

---

## Advanced Troubleshooting

### **Intermittent Problems**
**Characteristics**: Problems that come and go unpredictably
**Common Causes**: Loose connections, timing issues, environmental factors
**Strategies**:
- Log when problems occur to identify patterns
- Check for loose connections and cold solder joints
- Look for timing-related issues
- Monitor environmental conditions
- Use logging to capture problem conditions

### **Performance Issues**
**Characteristics**: System works but is slow or unreliable
**Common Causes**: Insufficient resources, inefficient code, timing bottlenecks
**Strategies**:
- Profile code to identify bottlenecks
- Monitor resource usage (CPU, memory, power)
- Optimize algorithms and data structures
- Consider hardware upgrades
- Implement caching or buffering strategies

### **Integration Challenges**
**Characteristics**: Components work individually but not together
**Common Causes**: Resource conflicts, timing issues, software conflicts
**Strategies**:
- Test components individually first
- Add components one at a time
- Check for shared resources (pins, memory, processing time)
- Implement proper error handling
- Use modular design principles

---

## Conclusion

Troubleshooting is one of the most valuable skills you'll develop in this course. Every problem you solve makes you more capable and confident. Remember that even experienced professionals encounter problems regularly - the difference is that they've developed systematic approaches to solving them.

The key takeaways are:
- **Stay systematic** in your approach
- **Document everything** you try
- **Learn from mistakes** and successes
- **Ask for help** when you need it
- **Celebrate solutions** as learning achievements

With practice, you'll become an excellent problem-solver, and that skill will serve you well far beyond this robotics course.