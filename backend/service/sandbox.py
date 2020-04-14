import epicbox
import json

class PythonSandbox:
    DOCKER_IMAGE = 'python-sandbox:latest'
    CPU_TIME = 1
    MEMORY = 64
    def __init__(self):
        epicbox.configure(
            profiles=[
                epicbox.Profile('python', self.DOCKER_IMAGE)
            ]
        )
    def run(self,source_code: str,input_json: str) -> dict:
        '''
        @return
        {
            'exit_code': 0, 
            'stdout': b"{'test': 1}\n", 
            'stderr': b'', 
            'duration': 0.067299, 
            'timeout': False, 
            'oom_killed': False
        }
        '''
        files = [{'name': 'main.py', 'content': source_code.encode('UTF-8')}]
        limits = {'cputime': self.CPU_TIME, 'memory': self.MEMORY}
        command = '''python3 main.py <<EOS
%s
EOS
''' % input_json
        result = epicbox.run('python', command, files=files, limits=limits)
        return result