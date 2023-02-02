# DEEP LEARNING SECURITY TOOLS REPOSITORY

Toronto Metropolitan University — Department of Electrical, Computer, and Biomedical Engineering

[2022 COE ENGINEERING DESIGN PROJECT (RSA02)](https://www.ecb.torontomu.ca/capstone/topics/2022/RSA02.html)

[https://rsa02.netlify.app/](https://rsa02.netlify.app/)

## CONTRIBUTORS

- [Nathan Cheung](https://www.linkedin.com/in/~nathan/)
- [Mohamed Abuomar](https://www.linkedin.com/in/~mohamed/)
- [Ornello Iannace](https://www.linkedin.com/in/ornello-iannace-b795a817a/)
- [Kacper Burza](https://www.linkedin.com/in/kacper-burza/)

## TOPIC CATEGORY

Software Systems

## PREAMBLE

As future technology, such as self-driving cars, are being built using neural networks, the safety of end users is at risk of being compromised by attacks on the neural network. while multiple efforts are being made to generate a set of tools to evaluate privacy and security risks associated with neural networks, there is a lack of aggregator tool for machine learning developers to test the robustness and safety of their deep learning algorithms with multiple tools for benchmarking purposes.

## OBJECTIVE

The objective of this project is to develop an open-source aggregator model focusing on three areas of Deep Neural Network (DNN) security: 1) Privacy, 2) Evasion attacks, and 3) Adversarial Examples.

## PARTIAL SPECIFICATIONS

1. The developed aggregator model must be able to check the resistance of a DNN model against one or more attacks using exiting libraries.
2. The aggregator accepts a model's parameters based on two characteristics of the attack, i.e. (1) Black box or white box and , (2) Privacy, Evasion, and Adversarial Examples.
3. The aggregator asks the user for security test parameters such as the number of epochs, number of folds, number of layers and other architectural questions.
4. The aggregator, calls the relevant libraries (that have already been collected) and runs the model-at-the-test for the given parameters.
5. The results are reported in tables and static and dynamic graphs in a user-friendly manner.

## SUGGESTED APPROACH

- The first step is to study for available Trustworthy ML libraries. for example: NIST Dioptra Project, Machine Learning Privacy Meter, CleverHans Repository, and Fool Box.
- Then to create a framework which accepts neural networks from Keras, one of the industry standard machine learning frameworks built on top of TensorFlow.
- The Framework should have a user-friendly and easy-to-learn interface to define DNN pipeline and set all parameters. The parameters need to be all stored, and the parameters of each run should be fully logged.
- Depending on the parameters, the framework selects the libraries from the repository, checks the model against the selected attack and generates the results.
- The Framework then communicates the results in three forms, Tables, static graphs and dynamic graphs using Python Libraries (eg., Tensorboard for dynamic graphs).

## GROUP RESPONSIBILITIES

The students will first collect the necessary libraries from the above sources and other investigated resources. Then the students study relevant libraries and identify all parameters that need to be captured. They then design a prototype for the user interface for input parameters and the output results (the front end). Development of the back-end, i.e. running the DNN model and generating the result is the next responsibility of the group.

## STUDENT A RESPONSIBILITIES

- Leading Requirements elicitation and analysis
- Leading identification and documentation of system specifications
- Ensuring the SDLC is improving according to the selected methodology
- Ensuring different modules and sub-modules can be integrated and synced.
- Leading integration test and ensuring software testing and quality assurance.

## STUDENT B RESPONSIBILITIES

- Data collection (search for open libraries)
- Data cleaning and preparation (identifying the library parameters)
- Data quality assurance (feasibility of aggregation)
- Data query (and procedures, triggers if necessary) development for the type of questions a modeller can ask for DNN security
- Design "what-if" scenarios working with Student A

## STUDENT C RESPONSIBILITIES

Back-end Development

- Incorporate feature vectors (working with St. B)
- Develop ML model - based on parameters set
- Generate results based on multiple runs of the ML model with different security modules.
- Experimental evaluation of the backend
- Implement back-end of "what-if" scenarios working with Student A and B

## STUDENT D RESPONSIBILITIES

Front-end Development

- Design user interface (UI) module
- Implement front-end of "what-if" scenarios working with Student B and C
- Prototyping the system UI
- Running usability test
- Integrate with back-end module

## TO ALL EDP STUDENTS

Due to COVID-19 pandemic, in the event University is not open for in-class/in-lab activities during the Winter term, your EDP topic specifications, requirements, implementations, and assessment methods will be adjusted by your FLCs at their discretion.
