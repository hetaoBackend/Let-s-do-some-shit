# Run ### pip install --upgrade "ibm-watson>=3.4.0" ### first
# We only have 2500 calls



import json
from ibm_watson import ToneAnalyzerV3

tone_analyzer = ToneAnalyzerV3(
    version='2017-09-21',
    iam_apikey='S6UUqaiyBjVHKaGsofghRRlLh2VFg7TPj_RazOF7aSSu',
    url='https://gateway.watsonplatform.net/tone-analyzer/api'
)

text = 'MINOR: FetchSessionHandler unnecessarily generates strings for DEBUG logging at INFO level. '

tone_analysis = tone_analyzer.tone(
    {'text': text},
    content_type='application/json'
).get_result()

print(json.dumps(tone_analysis, indent=2))