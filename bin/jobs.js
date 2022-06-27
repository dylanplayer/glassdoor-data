const fs = require('fs');

const maxCount = 10;
let counter = 0;

const incrementCounter = async () => {
  counter += 1;

  if (counter == maxCount) {
    clearInterval(interval);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write('CLEAN | ');

    for (i = 0; i < maxCount ; i++) {
      process.stdout.write('✨');
    }

    process.stdout.write(' |\n');

  } else {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write('CLEANING | ');
    
    for (i = 0; i < counter - 1; i++) {
      process.stdout.write('✨');
    }
  
    if (counter <= maxCount - 1) {
      process.stdout.write('🧼');
    }
  
    for (i = maxCount; i > 1 + counter; i--) {
      process.stdout.write('💩');
    }
    process.stdout.write('|');

  }
}

var interval = setInterval(incrementCounter, 300);

const data = JSON.parse(fs.readFileSync(`../data/dirty/glassdoor_salary.json`).toString());

const jobsHash = {};

data.forEach((post) => {
  const jobTitle = String(post.salary.salaries.val.jobTitle);
  if (jobTitle !== '') {
    if (!jobsHash[jobTitle]) {
      jobsHash[jobTitle] = 1;
    }
    jobsHash[jobTitle] += 1;
  }
});

const jobsArr = Object.entries(jobsHash).map((entry) => {
  const [title, count] = entry;
  return {title: title, count: count}
});

const sortedJobsArr = jobsArr.sort((a, b) => {
  if (a.count < b.count) {
    return 1;
  }
  if (a.count > b.count) {
    return -1;
  }
  return 0;
});;

const sortedEngineeringJobsArr = [];

sortedJobsArr.forEach((job) => {
  if (job.title.includes('Engineer')) {
    sortedEngineeringJobsArr.push(job);
  }
});

fs.writeFileSync('../data/clean/sortedEngineeringJobs.json', JSON.stringify(sortedEngineeringJobsArr));
fs.writeFileSync('../data/clean/sortedJobs.json', JSON.stringify(sortedJobsArr));

incrementCounter();
