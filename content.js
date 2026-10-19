window.VERILOGIC_CONTENT = {
  "title": "VeriLogic: Reinforcement Learning over Verifiable Logical Reasoning Traces",
  "abstractHtml": "Logical reasoning derives conclusions from premises through explicit intermediate inference steps, providing a natural basis for process-level verification and supervision. However, existing learning methods often rely on response-level outcome signals, which overlook heterogeneous correctness within the reasoning trace: a correct answer may contain invalid reasoning, while valid intermediate steps may also appear in an incorrect response. To address this issue, we introduce Reinforcement Learning on <strong>Veri</strong>fiable <strong>Logic</strong>al Reasoning (<strong>VeriLogic</strong>), which turns internal reasoning traces into explicit and verifiable learning objects. Rather than treating a response as an indivisible learning unit, VeriLogic decomposes logical reasoning into explicit intermediate judgments, proofs, and final decisions, and organizes them into a unified “<strong>Grounding - Optimization - Refinement</strong>” pipeline: (1) <em><strong>Verification-Grounded Reasoning Environment Construction</strong></em> grounds logical reasoning into explicit intermediate states and formally checkable proof obligations, making the internal reasoning process accessible to verification and learning; (2) <em><strong>Logical Structured Policy Optimization</strong></em> learns from verifier feedback through complementary global and local rewards, jointly optimizing the overall reasoning outcome while providing targeted optimization signals to different intermediate reasoning paths; and (3) <em><strong>Verifier-Guided Iterative Refinement</strong></em> acts on verifier feedback by leveraging proof states and error messages to iteratively diagnose and repair failed reasoning. Experiments on six logical reasoning benchmarks show consistent gains over strong baselines, with average improvements of 6.39% and 5.00% on Qwen3 and Llama-3.1. These results highlight the value of making logical reasoning traces verifiable, learnable, and refinable beyond final-answer supervision.",
  "introductionHtml": "<p>Logical reasoning gives LLMs a structured way to derive conclusions from premises, with intermediate judgments and inference paths that can be examined. Yet a correct final answer can conceal invalid reasoning or a failed proof, while an incorrect response may contain valid intermediate steps. A single response-level reward does not distinguish these different correctness states.</p><p>We introduce <strong>VeriLogic</strong>, a reinforcement learning framework that makes logical reasoning traces <strong>verifiable, learnable, and refinable</strong>. Its <strong>Grounding–Optimization–Refinement</strong> pipeline represents Positive, Negative, and Unknown reasoning paths explicitly, grounds proof obligations in Lean4, and combines global outcome supervision with path-specific local feedback through PSAR-GRPO. At inference time, Lean4 proof states and error messages guide the model to iteratively repair unsuccessful proofs.</p><p>Experiments on <strong>six logical reasoning benchmarks</strong> show consistent gains across three backbones. VeriLogic improves average accuracy over the strongest corresponding baselines by <strong>1.83, 6.39, and 5.00 percentage points</strong> on Qwen3-8B, Qwen3-4B, and Llama-3.1-8B, respectively. Ablations examine the contributions of formalization, path-specific advantage routing, and verifier-guided refinement.</p>",
  "pipelineCaptionHtml": "<strong>Overview of VeriLogic.</strong> VeriLogic follows a unified Grounding–Optimization–Refinement pipeline: it constructs explicit and verifiable reasoning paths, combines global outcome supervision with path-specific local advantages through PSAR-GRPO, and iteratively repairs unsuccessful proofs using Lean4 feedback at inference time.",
  "motivationCaptionHtml": "<strong>Heterogeneous correctness in logical reasoning.</strong> A final answer may conceal errors in intermediate reasoning views or proofs, while fine-grained supervision distinguishes and corrects these cases.",
  "resultsCaptionHtml": "<strong>Main results under the Lean4-formalized setting.</strong> Accuracy is reported for each dataset, and Avg. denotes the average over six benchmarks. ↑ indicates higher is better. Δ reports VeriLogic minus the strongest corresponding baseline in each column. Averages and differences are computed before rounding.",
  "models": [
    {
      "name": "Qwen3-8B",
      "rows": [
        {
          "method": "Base",
          "values": [
            "92.67",
            "85.33",
            "88.00",
            "89.33",
            "91.67",
            "93.00",
            "90.00"
          ]
        },
        {
          "method": "GRPO",
          "values": [
            "94.67",
            "88.00",
            "90.50",
            "91.00",
            "95.67",
            "96.33",
            "92.70"
          ]
        },
        {
          "method": "LogicReward",
          "values": [
            "95.67",
            "92.67",
            "92.50",
            "94.33",
            "96.00",
            "97.00",
            "94.70"
          ]
        },
        {
          "method": "LPT",
          "values": [
            "96.00",
            "89.33",
            "90.50",
            "90.67",
            "96.33",
            "98.00",
            "93.47"
          ]
        },
        {
          "method": "VeriLogic (ours)",
          "values": [
            "96.67",
            "96.67",
            "94.50",
            "95.33",
            "96.67",
            "99.33",
            "96.53"
          ]
        },
        {
          "method": "Delta",
          "values": [
            "+0.67",
            "+4.00",
            "+2.00",
            "+1.00",
            "+0.34",
            "+1.33",
            "+1.83"
          ]
        }
      ],
      "gain": "+1.83"
    },
    {
      "name": "Llama-3.1-8B",
      "rows": [
        {
          "method": "Base",
          "values": [
            "55.33",
            "45.67",
            "57.00",
            "48.33",
            "58.67",
            "74.00",
            "56.50"
          ]
        },
        {
          "method": "GRPO",
          "values": [
            "59.67",
            "49.33",
            "61.00",
            "52.67",
            "63.33",
            "80.33",
            "61.06"
          ]
        },
        {
          "method": "LogicReward",
          "values": [
            "56.33",
            "52.33",
            "64.00",
            "60.67",
            "60.00",
            "81.00",
            "62.39"
          ]
        },
        {
          "method": "LPT",
          "values": [
            "60.33",
            "51.67",
            "60.50",
            "57.67",
            "61.33",
            "77.67",
            "61.53"
          ]
        },
        {
          "method": "VeriLogic (ours)",
          "values": [
            "61.00",
            "60.67",
            "68.00",
            "62.67",
            "64.67",
            "87.33",
            "67.39"
          ]
        },
        {
          "method": "Delta",
          "values": [
            "+0.67",
            "+8.33",
            "+4.00",
            "+2.00",
            "+1.33",
            "+6.33",
            "+5.00"
          ]
        }
      ],
      "gain": "+5.00"
    },
    {
      "name": "Qwen3-4B",
      "rows": [
        {
          "method": "Base",
          "values": [
            "81.67",
            "69.67",
            "73.50",
            "69.33",
            "83.67",
            "82.33",
            "76.70"
          ]
        },
        {
          "method": "GRPO",
          "values": [
            "85.67",
            "74.33",
            "77.50",
            "74.33",
            "88.00",
            "86.33",
            "81.03"
          ]
        },
        {
          "method": "LPT",
          "values": [
            "88.00",
            "79.67",
            "80.00",
            "78.00",
            "90.00",
            "88.67",
            "84.06"
          ]
        },
        {
          "method": "VeriLogic (ours)",
          "values": [
            "92.33",
            "94.00",
            "88.00",
            "82.67",
            "93.67",
            "92.00",
            "90.44"
          ]
        },
        {
          "method": "Delta",
          "values": [
            "+4.33",
            "+14.33",
            "+8.00",
            "+4.67",
            "+3.67",
            "+3.33",
            "+6.39"
          ]
        }
      ],
      "gain": "+6.39"
    }
  ],
  "analysis": [
    {
      "title": "Component ablation",
      "image": "assets/figure14.png",
      "captionHtml": "<strong>Component ablation of VeriLogic on Qwen3-8B.</strong> Macro-averaged accuracy over six logical reasoning datasets under formalization, GRPO, PSAR-GRPO, verifier-guided refinement, and full VeriLogic configurations, together with matched controls."
    },
    {
      "title": "Complexity robustness",
      "image": "assets/noacc.png",
      "captionHtml": "<strong>LoCM complexity curves.</strong>"
    },
    {
      "title": "Verifier feedback",
      "image": "assets/figure10.png",
      "captionHtml": "<strong>Verifier feedback by repair round.</strong>"
    }
  ]
};
