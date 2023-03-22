#load "nuget:?package=Linedata.Foundation.Build&version=1.0.143"

BuildDefinition
    .RunYarnTarget("./", "build")
    .RunYarnTarget("./", "test")
    .BuildDockerImages(
        new Dockerfile(
            "./Docker/Dockerfile.Linedata.Trading.Application.BlotterDetails", 
            "./build", 
            "Linedata.Trading.Application.BlotterDetails"))
    .PushDockerImagesToArtifactory("trading")
    .Run();
